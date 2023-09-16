import React,{useState,useEffect} from "react";
import { db, dbRef,equalTo,get, orderByChild} from "../firebase.js";
import { query } from "firebase/database";
function FetchAllPets({ngoId}){
    const [petsData,setPetsData]=useState();
   useEffect(()=>{
    if(ngoId){
        const FetchNgoData =async()=>{
            try{
                const petRef = dbRef(db,`pets/`);
                const queryConstraints =[orderByChild("ngoId"),equalTo(ngoId)];
                const snapshot = await get(query(petRef, ...queryConstraints));
                const snapshotData = snapshot.val();
                if(snapshotData){
                   setPetsData(snapshotData);
                  }else{
                   console.log("no data in here");
                  }
            }catch(error){
                console.log(error);
            }
        }
        FetchNgoData();
    }
   },[ngoId]);
    return<>
  
    </>
}
export default FetchAllPets;