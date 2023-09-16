import React,{useState,useEffect,useContext} from "react";
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"
import { UserContext } from "../App";
import {db,dbRef,equalTo,get,set, orderByChild} from "../firebase.js";
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';
import { query, update } from "firebase/database";
import { Link, useParams } from "react-router-dom";
function AdoptionRequest() {
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  const adoptionId = useParams();
  const adoptionid = parseInt(adoptionId.adoptionid);
  const {User, ngoId} = useContext(UserContext);
  const [AdoptionDetails,setAdoptionDetails]=useState({});
  const [adoptionstatus,setAdoptionStatus]=useState("");
  const[petStatus,setPetStatus]=useState("");
  const [IsLoading,SetIsLoading]=useState(false);
    const[ResponseMessage,SetResponseMesage]=useState("");
    const[ResponseError,SetResponseError]=useState("");
  const adoptionList = Object.keys(AdoptionDetails).map((adoption)=> AdoptionDetails[adoption]);
  const petId = adoptionList && adoptionList.length > 0 ? adoptionList[0].petId: null;

  
useEffect(()=>{
if(User && adoptionid){
    const fetchAllAdoptedPets = async()=>{
      try{
        const adoptionRef = dbRef(db,`adoptions/`);
       const queryConstraints = [orderByChild("adoptionid"), equalTo(adoptionid)];
        const snapshot = await get(query(adoptionRef, ...queryConstraints));
        const adoptionData = snapshot.val();
       if(adoptionData){
        setAdoptionDetails(adoptionData);
       }else{
        console.log("no adoption data available");
       }
      }catch(error){
      console.log(error);
      }
    }
    fetchAllAdoptedPets();
  }
},[User,adoptionid]);

const updateAdoptionStatus = async(e)=>{
  SetIsLoading(true);
  e.preventDefault();
  try{
      const adoptionRef = dbRef(db,`adoptions/`);
      const petRef = dbRef(db,`pets/${petId}`);
      const queryConstraints = [orderByChild("ngoId"), equalTo(ngoId)];
      const adoptionSnapshot  = await get(query(adoptionRef, ...queryConstraints));
      const recordKey = Object.keys(adoptionSnapshot.val())[0];
      const adoptionUpdateRef = dbRef(db,`adoptions/${recordKey}`);
      await update(adoptionUpdateRef, { adoptionstatus: adoptionstatus });
      await update(petRef, {status:petStatus});
      SetResponseMesage("Status Updated SuccessFully!");
      setTimeout(() => {
        SetResponseMesage(null);
      }, 2000);
  }catch(error){
    SetResponseError("There Is Something Wrong! please try again.");
    setTimeout(() => {
      SetResponseError(null);
    }, 2000);
  }
}

  return (
    <>  <Sidebar />
  <MainSideOfDashboard /><div className="main_area_bottom"></div>
  {adoptionList.map((newaAdoption)=>{
    return(
      <div className="main_area_bottom Adoption_request">
      <div>
        <h2>Adoption Details </h2>
        <table className="m-2 w-100">
          <thead>
            <th>Adoption Id</th>
            <th>Status</th>
            <th>PetId</th>
            <th>Adopter Name</th>
            <th>Adoption Date</th>
          </thead>
          <tbody>
            <tr>
              <td>{newaAdoption.adoptionid}</td>
              <td>{newaAdoption.adoptionstatus}</td>
              <td>{newaAdoption.petId}</td>
              <td>{newaAdoption.fullname}</td>
              <td>{newaAdoption.createdAt}</td>
            </tr>
          </tbody>
        </table>
        <small className="note">
          **IN STATUS FIELD KINDLY UPDATE THE STATUS OF ADOPTION REQUEST BELOWE TO
          AVOID CONFLICT
        </small>
        <hr />
        <form name="update_adoption_status" className="row" onSubmit={updateAdoptionStatus}>
        <label htmlFor="female">Approved</label>
        <input type="radio" id="Approved" name="AdoptionStatus" className="adoption_status_input" value="Approved" onChange={(event)=>{setAdoptionStatus(event.target.value); setPetStatus("Adopted")}} checked={adoptionstatus === "Approved"}/>
        <label htmlFor="female">Rejected</label>
        <input type="radio" id="Rejected" name="AdoptionStatus" className="adoption_status_input" value="Rejected" checked={adoptionstatus === "Rejected"} onChange={(event)=>{setAdoptionStatus(event.target.value); setPetStatus("available")}}/>
      <button className='b'  type="submit" >Update Status</button>
      </form>
      </div>

      <div>
        <h2>Adopter Details</h2>
        <table className="m-2 w-100">
          <thead>
            <th>Adopter Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>OwnerShip</th>
            <th>PetExperience</th>
          </thead>
          <tbody>
            <tr>
              <td>{newaAdoption.fullname}</td>
              <td>{newaAdoption.mobile}</td>
              <td>{newaAdoption.email}</td>
              <td>{newaAdoption.address}</td>
              <td>{newaAdoption.ownership}</td>
              <td>{newaAdoption.petexperience}</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>


      <div>
      <h2>Pet Details</h2>
      <table className="m-2 w-100">
      <thead>
        <th>Profile</th>
        <th>PetId</th>
        <th>PetName</th>
        <th>Age</th>
        
      </thead>
      <tbody>
      <tr>
        <td><img src={newaAdoption.profilepic} alt="" /></td>
        <Link  to={`/pets/${newaAdoption.petId}`}><td>{newaAdoption.petId}</td></Link>
        <td>{newaAdoption.petname}</td>
        <td>{newaAdoption.age}</td>
        
</tr>
</tbody>
</table>
<hr />
      </div>
    </div>
    )
  })}

{IsLoading && (
        <div id="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
      {ResponseMessage && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content">
          <br></br><h3>Awesome</h3>
            <p className="message-text">{'\u{1F389}'} Congratulations! <br></br><br></br>{ResponseMessage}</p>
          </div>
        </div>
      )}
      {ResponseError && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content error-popup-model-content">
          <h3>Oh ho!</h3>
            <p className="message-text"> {'\u{1F61E}'} Sorry! <br></br><br></br>{ResponseError}</p>
          </div>
        </div> 
      )}
     </>
  );
}

export default AdoptionRequest;
