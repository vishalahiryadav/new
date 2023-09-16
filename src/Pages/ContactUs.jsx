import React from 'react'
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';

function contactUs() {
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  return (<>  <Sidebar />
  <MainSideOfDashboard /><div className="main_area_bottom">

    <div className='contact_box d-flex flex-column text-center align-items-center mt-5 gap-5'>
      <button className='contact_us_button mt-4'>Contact us</button>
      <p className=''>Got something to share ?Feel free to reach us.</p>
      <p>Email: contact@poodles.in</p>
      <p>Mobile:8696995374</p>

    </div>

  </div>
  </>
  )
}

export default contactUs