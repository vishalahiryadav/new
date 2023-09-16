import React,{useEffect,useContext, useState} from "react";
import Address from "./Addrass";
import Long_tab from "./Long_tab";
import { UserContext } from '../App'
import { db, dbRef, equalTo, get, orderByChild } from "../firebase";
import { query } from "firebase/database";

function MainSideOfDashboard() {
  const {User, NgoData,ngoId} = useContext(UserContext);
  const [numberOfPets,setNumberOfPets]=useState(0);
  const [numberOfAdoptions,setNumberOfAdoptions]=useState(0);
const [pendingAdoptions,setPendingAdoptions]=useState(0);
  useEffect(()=>{
    if(ngoId){
      const getData =async()=>{
        try{
          const petRef = dbRef(db,`pets/`);
          const adoptionRef = dbRef(db,`adoptions/`)
          const adoptionConstraints = [orderByChild("ngoId"), equalTo(ngoId)];
          const queryConstraints =[orderByChild("ngoId"), equalTo(ngoId)];
          const snapshot = await get(query(petRef, ...queryConstraints));
          const petData = snapshot.val();
          const adoptionsnapshot  = await get(query(adoptionRef, ...adoptionConstraints));
          const adoptionData = adoptionsnapshot.val();
          if(petData){
            const petLength = Object.keys(petData).length;
            setNumberOfPets(petLength);
          }if(adoptionData){
            const adoptionLength = Object.keys(adoptionData).length;
            setNumberOfAdoptions(adoptionLength);
            const pendingAdoption =Object.values(adoptionData).filter(item=>{
              return item.adoptionstatus === "pending";
            })
            const pendingAdoptionLength = Object.keys(pendingAdoption).length;
            setPendingAdoptions(pendingAdoptionLength)
          }
        }catch(error){
          console.log(error);
        }
      }
     getData();
    }
  },[ngoId])
  return (
    <div className="main_area row gap-5">
 
        <Address />
        <div className="group_of_long_tab col-12 col-md-6 d-flex flex-column justify-content-end align-items-end">
          <Long_tab value={`Number Of Pet Profile: ${numberOfPets}`} />
          <Long_tab value={`Total Adoption :${numberOfAdoptions}`} />
          <Long_tab value={`Pending Adoptions :${pendingAdoptions}`} />
        </div>
    </div>
  );
}

export default MainSideOfDashboard;
