import React,{useState,useEffect,useContext} from "react";
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import {db,dbRef,equalTo,get, orderByChild} from "../firebase.js";
import { query, remove } from "firebase/database";
import { getStorage, ref,deleteObject } from "firebase/storage";
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';

const storage = getStorage();
function PetDetailsSingleView() {
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  const {User, ngoId} = useContext(UserContext);
  const [PetData,setPetData]=useState({});
  const [deletePetModel, setDeletePetModel]=useState(false);
  const [ResponseMessage,setResponseMessage]=useState(false);
  const petid = useParams();
 const  petId = petid.petId;

  useEffect(()=>{
     if(User && ngoId){
      const fetchPetDetails = async()=>{
     try{
  const petRef = dbRef(db,`pets/`);
  const queryConstraints = [orderByChild("petId"),equalTo(petId)]
  const snapshot = await get(query(petRef, ...queryConstraints));
  const petData = snapshot.val();
  if(petData){
    setPetData(petData);
  }else{
    console.log("no data available");
  }
     }catch(error){
      console.log(error);
     }
      }
      fetchPetDetails();
     }
  },[User,ngoId]);
  
  const deletePet = async()=>{
    const petRef = dbRef(db,`pets/${petId}`);
    const snapshot = await get(petRef);
    const petData = snapshot.val();
   await remove(petRef);
   if(petData){
    const imageUrls = Object.values(petData.files);
    for(const imageurl of imageUrls){
      const storageRef = ref(storage, imageurl.__filePath);
      try {
        await deleteObject(storageRef);
        console.log(`Deleted image: ${imageurl.__filename}`);
      } catch (error) {
        console.error(`Error deleting image ${imageurl.__filename}:`, error);
      }
      console.log(imageurl);
    }
   }
   setDeletePetModel(false);
    setResponseMessage(true);

    setTimeout(() => {
      setResponseMessage(false);
    }, 3000);
  }
const petDataList = Object.keys(PetData).map((petData)=>PetData[petData]);
  return (<>  <Sidebar />
  <MainSideOfDashboard /><div className="main_area_bottom"></div>
    {petDataList.map((singlepet)=>{
    const petfiles = singlepet.files;
    const fileIds = Object.keys(petfiles);
    const firstFileId = fileIds[0];
    const firstFile = petfiles[firstFileId];
    const profilepic = firstFile.__filePath;
      return(
        <div className='Pet-id main_area_bottom'>
        <h2>Pet Details</h2>
        <div className="row align-item-center">
          <div className="col-12 col-md-3">
            <img src={profilepic} alt="" />
          </div>
          <div className="col-12 col-md-3 p-4">
          <p>
          Pet Added On:{singlepet.createdAt}
            </p>
            <br />
            <p>
            PetId: {singlepet.petId}
            </p>
          </div>
       </div>
       <table className='m-4'>
        <thead>
          <th>PetName</th>
          <th>Gender</th>
          <th>Pet Age</th>
          <th>City</th>
          <th>Status</th>
          <th>Breed</th>
        </thead>
        <tbody>
          <tr>
          <td>{singlepet.petname}</td>
          <td>{singlepet.category}</td>
          <td>{singlepet.age}</td>
          <td>{singlepet.city}</td>
          <td>{singlepet.status}</td>
          <td>{singlepet.breed}</td>
          </tr>
        </tbody>
       </table>
       <div className='Pet_details m-4'>
       <p>
       Pet Description:
       <p>{singlepet.description}</p>
       </p>
       <address className=''>
        <p>MedicalHistory:</p>
        <p>{singlepet.medicalhistory}</p>
       </address>
      </div>
      <button name="deletepet" type="button" onClick={()=>{setDeletePetModel(true)}}>Delete pet</button>
      </div>
      
      )
    })}
    {deletePetModel && 
     <div className="modal message-popup-model">
     <div className="message-popup-model-content">
     <br></br><h3>Confirm Delete Pet?</h3>
     <button name="confirmdeletepet" className="delete_pet_button" type="button" onClick={deletePet} >Yes</button>
     <button name="rejectdeletepet" className="delete_pet_button" type="button" onClick={()=>{setDeletePetModel(false)}}>No</button>
     </div>
   </div>
    }
   {ResponseMessage && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content">
          <br></br><h3>Deleted Pet Successfully!</h3>
          </div>
        </div>
      )}
    </>
  )
}

export default PetDetailsSingleView;