import React, { useEffect, useState } from "react";
import items from "../ArrayData/items";

const itemPerPage = 3;

const numberOfPage = Math.ceil(items.length / itemPerPage);
const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);
console.log(pageIndex);

export default function AllPet() {
  const [currentPage, setCurrentPage] = useState(0);
  const items = items.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app">
      {items.map((item) => {
        return (
          <div className="item">
            <div className="column">{item.id}</div>
            <div className="column">{item.PetName}</div>
            <div className="column">{item.Category}</div>
            <div className="column">{item.Breed}</div>
            <div className="column">{item.Status}</div>
          </div>
        );
      })}
      <div>
        <button
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
        {/* } */}
        <button
          disabled={currentPage >= numberOfPage - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
