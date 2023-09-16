import React, {useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
function UseProtectedRoutes(){
    const navigate = useNavigate();
    const { User } = useContext(UserContext);
    if (!User) {
        navigate("/");
      }
}
export default UseProtectedRoutes;