import React from "react";
import Short_tab from "../Component/Short_tab";
import { useState } from "react";
import AddNewPet from "../Component/AddNewPet";
import AllPet from "../Component/AllPet";
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';

function NgoPets({ngoId}) {
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  const [ButtonName, setButtonName] = useState(<AddNewPet />);
  const renderSelectedComponent = () => {
    switch (ButtonName) {
      case 1:
        return <AddNewPet />;
      case 2:
        return <AllPet ngoId={ngoId}/>;
      default:
        return <AddNewPet />;
    }
  };

  return (<>  <Sidebar />
  <MainSideOfDashboard />
    <div className="row main_area_bottom g-5 pt-5">
      <div className="col-12 col-md-6">
        <p className="topic_heading">Ngo Pets</p>
        <div className="ngoPets">

          <div onClick={() => setButtonName(1)}>
            <Short_tab img="../Image/Group 33.svg" value="AddNewPet" />
          </div>
          <div onClick={() => setButtonName(2)}>
            <Short_tab img="../Image/G.svg" value="All Pets" />
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
