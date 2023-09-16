import React from "react";
import { Link } from "react-router-dom";

function Sidebar({handleLogout}) {
  return (
    <div className="sidebar">
      <div className="d-flex gap-4 sidebar_point">
        <img src="/Image/Group 16.svg" alt="" />
        <Link to="/Dashboard" className="">
          <button>Dashboard</button>
        </Link>
      </div>
      <div className="d-flex gap-4 sidebar_point">
        <img src="/Image/Group 17.svg" alt="" />
        <Link to="/NgoPets" className="">
          <button>NGO Pets</button>
        </Link>
      </div>
      <div className="d-flex gap-4 sidebar_point">
        <img src="/Image/Group 27.svg" alt="" />
        <Link to="/Bookings" className="">
          <button>Bookings</button>
        </Link>
      </div>
      <div className="d-flex gap-4 sidebar_point">
        <img src="/Image/Group 29.svg" alt="" />
        <Link to="/ContactUs" className="">
          <button>Contact Us</button>
        </Link>
      </div>
      <div className="d-flex gap-4 sidebar_point">
        <img src="/Image/Group 30.svg" alt="" />
        <Link to="/Settings" className="">
          <button>Profile</button>
        </Link>
      </div>
      <div className="d-flex gap-4 sidebar_point">
        <img src="/Image/Group 31.svg" alt="" />

          <button type="button"  name="header_login_form_btn" onClick={handleLogout}>Log Out</button>

      </div>
    </div>
  );
}

export default Sidebar;
