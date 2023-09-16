import React,{useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import {db,dbRef,equalTo,get, orderByChild} from "../firebase.js";
import { query } from "firebase/database";

function Adopted() {
   
  const {User, ngoId} = useContext(UserContext);
  const [AdoptedPets,setAdoptedPets]=useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const adoptedPetList = Object.keys(AdoptedPets).map((adoption)=>AdoptedPets[adoption]);
  const petsPerPage = 6;
  const petlength = Object.keys(AdoptedPets).length;
  const numberOfPage = Math.ceil(petlength/petsPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);
  const adoptionItems = adoptedPetList.slice(currentPage * petsPerPage,(currentPage + 1) * petsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
useEffect(()=>{
if(User && ngoId){
  const fetchAllAdoptedPets = async()=>{
    try{
     const adoptionRef = dbRef(db,`adoptions/`);
     const queryConstraints = [orderByChild("ngoId"), equalTo(ngoId)];
     const snapshot = await get(query(adoptionRef, ...queryConstraints));
     const adoptionData = snapshot.val();
     if(adoptionData){
      const ftlteredAdoptions = Object.values(adoptionData).filter(item =>{
        return item.adoptionstatus === "adopted";
      });
      setAdoptedPets(ftlteredAdoptions);
     }else{
      console.log("no adoption data available");
     }
    }catch(error){
    console.log(error);
    }
  }
  fetchAllAdoptedPets();
}
},[User,ngoId]);
return (
  <>
    {adoptedPetList.length === 0 ? (
      <div>No Adopted Pets Yet!</div>
    ) : (
      adoptionItems.map((adoption) => (
        <div className="adopted row justify-content-center m-2 p-0 align-items-center" key={adoption.adoptionid}>
          <div className="col-12 col-md-3"><img src={adoption.profilepic} alt={adoption.petname} /></div>
          <div className="col-12 col-md-4">
            <h2>{adoption.fullname}</h2>
            <br />
            <h2>{adoption.petname}</h2>
          </div>
          <div className="col-12 col-md-5">
            <h2 className="p-0">{adoption.adoptionstatus}</h2>
            <br />
            <h2> 
              <Link to={`/adoptions/${adoption.adoptionid}`} className="">
                <div>{adoption.adoptionid}</div>
              </Link>
            </h2>
          </div>
        </div>
      ))
    )}
       {AdoptedPets.length > 0 ? 
    <div className="pagination_container">
    <button
      // className="bg"
      disabled={currentPage < 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      Previous
    </button>

    {pageIndex
      .slice(
        Math.max(0, currentPage - 2),
        Math.min(numberOfPage, currentPage + 3)
      )
      .map((page) => (
        <button
        
          key={page}
          onClick={() => handlePageChange(page - 1)}
          className={page === currentPage + 1 ? "active" : ""}
        >
          {page}
        </button>
      ))}

    <button
      disabled={currentPage >= numberOfPage - 1}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
  :null
    }
  </>
);
}


export default Adopted;

