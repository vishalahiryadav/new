import React, { useState, useEffect,useContext } from "react";
import { db, dbRef,equalTo,get, orderByChild} from "../firebase.js";
import { query } from "firebase/database";
import { UserContext } from "../App";
import {Link} from "react-router-dom";



export default function AllPet({ngoId}) {
  const itemPerPage = 6;
  const User = useContext(UserContext);
  const [AllPets, setAllPets]=useState({});
  const petlength = Object.keys(AllPets).length;
  const [currentPage, setCurrentPage] = useState(0);
  const petlist = Object.keys(AllPets).map((key)=>AllPets[key]);
  const numberOfPage = Math.ceil(petlength / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);
  const items = petlist.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
  useEffect(() => {
    if (User && ngoId) {
      const fetchAllPets = async () => {
        try {
          const petsRef = dbRef(db, `pets/`);
          const queryConstraints = [orderByChild("ngoId"), equalTo(ngoId)];
          const snapshot = await get(query(petsRef, ...queryConstraints));
          const petsData = snapshot.val();
          if (petsData) {
            setAllPets(petsData);
          } else {
            console.log("No pets data found.");
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchAllPets();
    }
  }, [User, ngoId]);
  

  return (
    <div>
      <table className="table_box">
        <thead>
          <th>Sr. no</th>
          <th>PetName</th>
          <th>Category</th>
          <th>Breed</th>
          <th>Status</th>
        </thead>
        {items.map((pet) => (
  <tr key={pet.petId}>
    <td><Link to={`/pets/${pet.petId}`}>{pet.petId} </Link></td>
    <td>{pet.petname}</td>
    <td>{pet.category}</td>
    <td>{pet.breed}</td>
    <td>{pet.status}</td>
  </tr>
))}
      </table>
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
          // className="bg"
          disabled={currentPage >= numberOfPage - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
