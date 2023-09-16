import React, { useState } from 'react';
import { SetMetaData } from '../CustomHook/SetMetaData';
import Short_tab from '../Component/Short_tab'
import Adopted from '../Component/Adopted'
import PendingAdoptions from '../Component/PendingAdoptions'
import AddNewPet from '../Component/AddNewPet';
import AllPet from '../Component/AllPet';
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"

function Dashboard({User,NgoData,handleLogout}) {
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  SetMetaData("description",
  "Manage your Poodles Pet Adoption profile. Manage Pending Adoption Applications, Add New Pet Available For Adoption In Your City, and stay connected with our community of pet lovers.",
  "Your Poodles Pet Adoption Profile",
  );
const ngoId = User && User.uid;
  const [ButtonName, setButtonName] = useState();
  const renderSelectedComponent = () => {
    switch (ButtonName) {
      case "Add New Pet":
        return <AddNewPet   User={User}/>;
      case "View All Pets":
        return <AllPet  ngoId={ngoId}/>;
      default:
        return <PendingAdoptions/>
    }
  };


  return (<>
    <Sidebar handleLogout={handleLogout}/>
        <MainSideOfDashboard />
    <div className='row main_area_bottom text-center g-5'>
      <div className='col-12 col-md-6'>
        <p className='m-3 topic_heading'>Quick Actions</p>
        <div className='d-flex quick_actions_button justify-content-between'>
          <div onClick={() => setButtonName("Add New Pet")}>
            <Short_tab img="./Image/Group 33.svg" value="AddPet" className="m-0" />
          </div>
          <div onClick={() => setButtonName("View All Pets")}>
            <Short_tab img="./Image/G.svg" value="AllPets" className="m-0" />
          </div>
        </div>
        <p className='m-3 topic_heading'>{ButtonName ? ButtonName :"Pending Adoptions"}</p>
        {renderSelectedComponent()}

      </div>


      <div className='col-12 col-md-6'>
        <p className='my-4 topic_heading'>Adopted</p>
        <Adopted />
      </div>
    </div>
</>
  )
}

export default Dashboard

