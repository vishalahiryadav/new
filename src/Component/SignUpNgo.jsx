import React, { useState } from "react";
import { db, push, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, dbRef,set} from "../firebase.js";
import { getAuth,sendEmailVerification } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import InputField from "./InputField";
import { FileField } from "./InputField";
const  storage = getStorage();
function SignUpNgo() {
 const storageRef = ref(storage);
 const [IsLoading,SetIsLoading]=useState(false);
    const[ResponseMessage,SetResponseMesage]=useState("");
    const[ResponseError,SetResponseError]=useState("");
  const image  = "./Images/InputFileImg.png";
  const [file,setFile]=useState([]);
  const [Details,setDetails]=useState({
    ngoname:"",
    email:"",
    mobile:"",
    password:"",
    confirmpassword:"",
    privacyPolicy:"",
  })
 
  function handleDetails(event){
    const newValue = event.target.value;
    const inputName = event.target.name;
    setDetails((prevValue)=>{
      return {
        ...prevValue,
        [inputName]: newValue
    };
    })
  }
  function handleFileChange(event){
   const selectedFile = event.target.files[0];
   const ValidFileType =validateFileType(selectedFile);
   const ValidFileSize = ValidateFileSize(selectedFile);
   if(ValidFileSize && ValidFileType){
    setFile(selectedFile)
   }else if(!ValidFileType){
    SetResponseError("Selected File Type Is Not Allowed!");
    setTimeout(() => {
      SetResponseError(null);
    }, 3000);
   }else if(!ValidFileSize){
    SetResponseError("File Size Is Excceding The File Limit!");
    setTimeout(() => {
      SetResponseError(null);
    }, 3000);
   }
  }
  const validateFileType = (file)=>{
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    return allowedTypes.includes(file && file.type)
  }
  
const ValidateFileSize = (file)=>{
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  return file.size <= MAX_FILE_SIZE;
}
const HandleFileUpload = async (ngoId) => {
  if (file) { // Check if a file is selected
    const fileref = ref(storageRef, `ngoImages/${file.name}`);
    try {
      const snapshot = await uploadBytes(fileref, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      if (downloadUrl) {
        const fileData = {
          __filename: file.name,
          __filePath: downloadUrl
        }
        const newNgoFileRef = push(dbRef(db,`ngos/${ngoId}/files`));
        await set(newNgoFileRef,fileData);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("no file is selected!");
  }
};


  const PostDetails = async (err)=>{
    const {ngoname,email,mobile,password,privacyPolicy}=Details;
    SetIsLoading(true);
    try{
      return fetchSignInMethodsForEmail(getAuth(), email).then((signInMethods)=>{
        if(signInMethods.length === 0){
          return createUserWithEmailAndPassword(getAuth(), email, password);
        }else{
          SetResponseError("An account with this email already exists.");
              setTimeout(() => {
                SetResponseError(null);
              }, 2000);
        }
      }).then(async (userCredential)=>{
        if(userCredential){
          sendEmailVerification(userCredential.user);
          const{uid}=userCredential.user;
          const newNgoRef = dbRef(db, `ngos/${uid}`);
          const newData = {
            ngoId: uid,
            email,
            mobile,
            ngoname,
            role: "ngo",
            privacyPolicy,
            createdAt: new Date().toLocaleString(), 
          };
          await set(newNgoRef,newData)
          HandleFileUpload(uid)
          SetResponseMesage("We have sent you a verification email, please click on the given link and verify your account!");
          setTimeout(() => {
            SetResponseMesage(null);
          }, 2000);
        }
      })
    }catch(error){
      SetResponseError("There Is Something Wrong! please try again.");
      setTimeout(() => {
        SetResponseError(null);
      }, 2000);
    }
      }
const handleSubmit = (e)=>{
  e.preventDefault();
  PostDetails().then(()=>{
    SetIsLoading(false);
    setDetails({
      ngoname:"",
      email:"",
      mobile:"",
      password:"",
      confirmpassword:"",
      privacyPolicy:"",
    });
  })
}

  return (
    
    <div className="sign_up_form row g-0">
      {IsLoading && (
        <div id="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
      {ResponseMessage && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content">
          <br></br><h3>Awesome</h3>
            <p className="message-text">{'\u{1F389}'} Congratulations! <br></br><br></br>{ResponseMessage}</p>
          </div>
        </div>
      )}
      {ResponseError && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content error-popup-model-content">
          <h3>Oh ho!</h3>
            <p className="message-text"> {'\u{1F61E}'} Sorry! <br></br><br></br>{ResponseError}</p>
          </div>
        </div> 
      )}
      <div className="left_img_container">
      <img
        src="./Images/sign_up_ngo_page_image.svg"
        className=" sign_up_img col-12 col-md-6"
      />
      </div>
      <div className="sign_up_right_section col-12 col-md-6 d-flex">
        <h1>Create Ngo Profile</h1>
        <form name="ngo_signup_form" method="POST" onSubmit={handleSubmit}>
          <InputField  pattern="[A-Za-z\s]+" name="ngoname" className="input_box" type="text" placeholder="Ngo Name"  value={Details.ngoname} onChange={handleDetails}/>
          <InputField  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" name="email" className="input_box" type="email" placeholder="Ngo Email" value={Details.email} onChange={handleDetails} />
          <InputField  pattern="[0-9]{10}" name="mobile" className="input_box" type="text" placeholder="Ngo Mobile"  value={Details.mobile} onChange={handleDetails}/>
          <InputField  pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" name="password" className="input_box" type="password" placeholder="Password" value={Details.password} onChange={handleDetails}/>
          <InputField    name="confirmpassword" className="input_box" type="password" placeholder="Confirm Password" value={Details.confirmpassword} onChange={handleDetails}/>
          <label htmlFor="image_uploads" required><img src={image} className="img-fluid" /></label>
           <FileField  type="file" id="image_uploads" name="image_uploads" accept="image/jpeg,image/png,image/jpg" hidden onChange={handleFileChange}/>
           {file && <div className="selected-file-name">{file.name}</div>}
           <div className="checkbox_container d-flex">
        <input required type="checkbox" value="Agreed"  onChange={handleDetails} name="privacyPolicy"  className="input_checkbox" />
        <span><p className="mb-0 term">I Agree To All Term And Privacy Policy.</p></span>
        </div>
        <button type="submit" className="create_account_button">Create Account</button>
        </form>  
      </div>
    </div>
  );
}

export default SignUpNgo;
