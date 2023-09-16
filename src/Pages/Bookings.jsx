import React from "react";
import Short_tab from "../Component/Short_tab";
import { useState } from "react";
import AddNewPet from "../Component/AddNewPet";
import PendingAdoptions from "../Component/PendingAdoptions";
import AllAdoptions from "../Component/AllAdoptions";
import Adopted from "../Component/Adopted";
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';

function NgoPets() {
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  const [ButtonName, setButtonName] = useState(<AddNewPet />);

  const renderSelectedComponent = () => {
    switch (ButtonName) {
      case 1:
        return <PendingAdoptions />;
      case 2:
        return <AllAdoptions />;
      case 3:
        return <Adopted img=<svg width="4rem" height="4rem" viewBox="0 0 118 112" fill="none" xmlns="http://www.w3.org/2000/svg"> <ellipse id="Ellipse 32" cx="59" cy="56" rx="59" ry="56" fill="#D9D9D9" /></svg>
        adopterName="adopter Name" petName="petName" AdoptionDate="AdoptionDate" PetId="PetId" />;
      default:
        return <PendingAdoptions/>
    }
  };

  return (<>  <Sidebar />
  <MainSideOfDashboard />
    <div className="row main_area_bottom text-center g-5">
      <div className="col-12 col-md-6">
        <p className="my-4 topic_heading">Quick Actions</p>
        <div className="">

          <div onClick={() => setButtonName(1)}>
            <Short_tab img="../Image/Group 33.svg" value="All Pending" />
          </div>
          <div onClick={() => setButtonName(2)}>
            <Short_tab img="../Image/G.svg" value="All Adoption" />
          </div>
          <div onClick={() => setButtonName(3)}>
            <Short_tab img="../Image/Group 33.svg" value="Adopted" />
          </div>

        </div>
      </div>
      <div className="col-12 col-md-6">
      {renderSelectedComponent()}
      </div>
    </div>
    </>
  );
}

export default NgoPets;
