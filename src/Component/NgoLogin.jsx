import React, { useState } from "react";
import InputField from "./InputField";
import {Link,useNavigate} from "react-router-dom";
import { db, dbRef,equalTo,get, orderByChild} from "../firebase.js";
import { query } from "firebase/database";
import {
    getAuth,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail} from "firebase/auth";
    import { UseAuth } from "../CustomHook/UseAuth";
function NgoLogIn({ showPopUp, setShowPopUp }){
    const navigate = useNavigate();
    const {getUserData}=UseAuth();
    const [IsLoading,SetIsLoading]=useState(false);
    const [ResponseError, SetResponseError] = useState("");
    const [Details,setDetails]=useState({
        email:"",
        password:"",
    })
    function handleDetails(event) {
        const InputName = event.target.name;
        const NewValue = event.target.value;
        setDetails((prevValue) => {
          return {
            ...prevValue,
            [InputName]: NewValue,
          };
        });
      }
      
      const PostDetails = async () => {
        const { email, password } = Details;
      
        try {
          SetIsLoading(true);
          const signInMethods = await fetchSignInMethodsForEmail(getAuth(), email);
          if (signInMethods.length === 0) {
            SetResponseError("An account with this email does not exist.");
            setTimeout(() => {
              SetResponseError(null);
            }, 4000);
            return;
          }
      
          const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      
          if (userCredential) {
            const user = userCredential.user;
            if (user && !user.emailVerified) {
              SetResponseError("Please verify your email to login!");
              setTimeout(() => {
                SetResponseError(null);
              }, 3000);
              await getAuth().signOut();
              return;
            }
      
            const userData = await getUserData(user.uid);
      
            if (!userData) {
              SetResponseError("This Email User Is Not Allowed To Access The Portal!");
              setTimeout(() => {
                SetResponseError(null);
              }, 3000);
              await getAuth().signOut();
              return;
            }
            const userRole = userData[user.uid]?.role;
            console.log("User role:", userRole);
            if (!userRole) {
              console.log("User role not found. Can not access the dashboard.");
              SetResponseError("This Email User Is Not Allowed To Access The Portal!.");
              setTimeout(() => {
                SetResponseError(null);
              }, 3000);
              await getAuth().signOut();
              return;
            }
            const allowedTypes = ["ngo"];
            if (allowedTypes.includes(userRole)) {
              console.log("User has permission. Navigating to dashboard...");
              navigate('/Dashboard');
            } else {
              console.log("User does not have permission.");
              SetResponseError("This Email User Is Not Allowed To Access The Portal!");
              setTimeout(() => {
                SetResponseError(null);
              }, 3000);
              await getAuth().signOut();
              return;
            }
          }
        } catch (error) {
          if (error.code === "auth/wrong-password") {
            SetResponseError("The provided password is incorrect.");
          } else {
            SetResponseError("There is something wrong! Please try again.");
          }
          setTimeout(() => {
            SetResponseError(null);
          }, 3000);
        }
      };
      
      function handleSubmit(e) {
        e.preventDefault();
        PostDetails().then(()=>{
          SetIsLoading(false);
          setShowPopUp(!showPopUp);

        })
        setDetails({
          email: "",
          password: "",
        });
      }

    return(
    <>
     {IsLoading && (
        <div id="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
{ResponseError && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content error-popup-model-content">
            <h3>Oh ho!</h3>
            <p className="message-text">
              {" "}
              {'\u{1F61E}'} Sorry! <br></br>
              <br></br>
              {ResponseError}
            </p>
          </div>
        </div>
      )}
      {showPopUp && (
        <div className="container-fluid pop_up_login_form">
    <h3 className="u-textCenter mt-5" style={{color:"white"}}>Sign in to Your Account</h3>
    <button type="button" onClick={() => setShowPopUp(false)}><i className="fa fa-times"  ></i></button>
   <form
     name="user_login_form"
     method="POST"
     className="user_login_form"
     onSubmit={handleSubmit}
   >
     <InputField
      pattern="/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"
       required
       type="email"
       name="email"
       placeholder="Email"
       className="input_box"
       value={Details.email}
       onChange={handleDetails}
     />
     <InputField
      pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
       required
       type="password"
       name="password"
       placeholder="Password"
       className="input_box"
       value={Details.password}
       onChange={handleDetails}
     />
   
     <button className="popup_login_form_btn_class" type="submit"><i className="fa fa-lock"></i> LogIn</button>
   </form>
   <div className=" u-textCenter forgot-pwd-container mt-3">
     <Link to="/forgotpassword" className="txt txt_link m-txt_lg m-txt_underline" onClick={() => setShowPopUp(false)}>Forgot password?</Link>
   </div>
 </div>
      )}

    </>)
}
export default NgoLogIn;