import React, { useState,createContext,useEffect, useContext } from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./Component/Header";
import LandingPage from "./Pages/LandingPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Dashboard from "./Pages/Dashboard";
import NgoPets from "./Pages/NgoPets";
import Bookings from "./Pages/Bookings";
import ContactUs from "./Pages/ContactUs"
import Settings from "./Pages/Settings"
import AdoptionRequest from "./Pages/AdoptionRequest";
import ForgotPassword from "./Component/ForgotPassword"
import PetDetailsSingleView from "./Pages/PetDetailsSingleView";
import { db, dbRef,get,onAuthStateChanged} from "./firebase.js";
import { getAuth,signOut} from "firebase/auth";
import { query,orderByChild,equalTo } from "firebase/database";
import { UseAuth } from "./CustomHook/UseAuth"
export const UserContext = createContext();
function App() {
  const { User, handleLogout, NgoData, getUserData } = UseAuth(); 
  const ngoId = User && User.uid;
  const userContextValue = {
    User,ngoId,NgoData
   }
  return (
    <UserContext.Provider value={userContextValue}>
    <div className="App">
    <Router>
    <Header User={User} handleLogout={handleLogout} />
    <Routes>
   <Route path="/" element={ <LandingPage />}></Route>
   <Route path="/registration" element={ <RegistrationPage />}></Route>
   <Route path="/Dashboard" element={ <Dashboard  handleLogout={handleLogout} NgoData={NgoData} User={User}/>}></Route>
   <Route path="/NgoPets" element={ <NgoPets ngoId={ngoId}/>}></Route>
   <Route path="/Bookings" element={ <Bookings />}></Route>
   <Route path="/ContactUs" element={ <ContactUs />}></Route>
   <Route path="/Settings" element={ <Settings NgoData={NgoData}/>}></Route>
   <Route path="/forgotpassword" element={<ForgotPassword/>}/>
   <Route path="/adoptions/:adoptionid" element={ <AdoptionRequest />}></Route>
   <Route path="/pets/:petId" element={ <PetDetailsSingleView />}></Route>
   </Routes>
   </Router>


    </div>
           
    </UserContext.Provider>

  )
}

export default App;

