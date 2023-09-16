import React,{useState,useEffect,useContext} from "react";
import Short_tab from '../Component/Short_tab'
import Sidebar from "../Component/Sidebar"
import MainSideOfDashboard from "../Component/MainSideOfDashboard"
import { UserContext } from "../App";
import { db,dbRef,set,get } from "../firebase";
import { getStorage,ref,uploadBytes,getDownloadURL,deleteObject } from "firebase/storage";
import RedirectUnAuthUser from '../CustomHook/RedirectUnAuthUser';

const storage = getStorage();
function Settings({NgoData}) { 
  window.onload =()=>{
    RedirectUnAuthUser();
  }
  const {User, ngoId} = useContext(UserContext);
  const [ngoDescription, setNgoDescription]=useState("");
  const[file,setFile]=useState({});
  const[mobile, setMobile]=useState("");
  const[address,setAddress]=useState("")
  const[IsLoading,SetIsLoading]=useState(false);
  const[ResponseMessage, setResponseMessage]=useState("");
  const[ResponseError, SetResponseError]=useState("");
  const ngoData = Object.values(NgoData);
  const logoUrl = ngoData[0].ngologo;
  const updateNgoDescription = async()=>{
    try{
      const ngoRef = dbRef(db,`ngos/${ngoId}/ngodescription`);
      await set(ngoRef,ngoDescription).then(()=>{
        setResponseMessage("Ngo Description Added Successfully!");
        setTimeout(() => {
          setNgoDescription("")
          setResponseMessage("");
        }, 4000);
      })
    }catch(error){
      SetResponseError("There Is Something Wrong! please try again.");
      setTimeout(() => {
        SetResponseError(null);
      }, 4000);
    }
   
  }
  function handleFileChange(event){
    const selectedfile = event.target.files[0];
    const ValidFileSize = validateFileSize(selectedfile);
    const ValidFileType = validateFileType(selectedfile);
    if(ValidFileSize && ValidFileType){
      setFile(selectedfile)
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
  return allowedTypes.includes(file && file.type);
 }
 const validateFileSize = (file)=>{
  const MAX_FILE_SIZE = 1*1024*1024;
  return file.size <= MAX_FILE_SIZE;
 }
 const ProcessFileUpload = async(e)=>{
  e.preventDefault();
  SetIsLoading(true);
  if(file){
  try{
    const ngoRef = dbRef(db,`ngos/${ngoId}`);
   const snapshot = await get(ngoRef);
   const ngoData = await snapshot.val();
   const imageUrl = ngoData.ngologo;
   if(imageUrl){
    const storageRef = ref(storage, imageUrl.__filePath);
    await deleteObject(storageRef);
    const fileRef = ref(storage,`ngologo/${file.name}`);
    const uploadFile = await uploadBytes(fileRef,file);
    const downloadUrl = await getDownloadURL(uploadFile.ref);
    if(downloadUrl){
      
      const __filePath = downloadUrl
    
      const ngoLogoRef = dbRef(db,`ngos/${ngoId}/ngologo`);
      await set(ngoLogoRef,__filePath);
      console.log("file url saved in database");
      SetIsLoading(false);
      setResponseMessage("Ngo Logo Updated Successfully!");
      setTimeout(() => {
        setResponseMessage("");
      }, 4000);
    }
   }else{
    const fileRef = ref(storage,`ngologo/${file.name}`);
    try{
      const uploadFile = await uploadBytes(fileRef,file);
      const downloadUrl = await getDownloadURL(uploadFile.ref);
      console.log("file upload is done");
      if(downloadUrl){

          const __filePath = downloadUrl;
    
        const ngoLogoRef = dbRef(db,`ngos/${ngoId}/ngologo`);
        await set(ngoLogoRef,__filePath);
        console.log("file url saved in database");
        SetIsLoading(false);
        setResponseMessage("Ngo Logo Updated Successfully!");
        setTimeout(() => {
          setResponseMessage("");
        }, 4000);
      }
      }catch(error){
        SetIsLoading(false);
       SetResponseError("There Is Something Wrong! please try again.");
       setTimeout(() => {
        SetResponseError("");
      }, 4000);
      }
   }
  }catch(error){
    SetIsLoading(false);
    SetResponseError("There Is Something Wrong! please try again.");
    setTimeout(() => {
      SetResponseError("");
    }, 4000);
  }
  }
   
 }
 const updateMobile =async(e)=>{
  e.preventDefault();
  SetIsLoading(true);
  try{
    const ngoRef = dbRef(db,`ngos/${ngoId}/mobile`);
    await set(ngoRef,mobile).then(()=>{
      SetIsLoading(false);
      setResponseMessage("Ngo MObile Updated Successfully!");
      setTimeout(() => {
        setMobile("")
        setResponseMessage("");
      }, 4000);
    })
  }catch(error){
    SetIsLoading(false);
    SetResponseError("There Is Something Wrong! please try again.");
      setTimeout(() => {
        SetResponseError("");
      }, 4000);
  }
 }
 const updateNgoAddress = async(e)=>{
  e.preventDefault();
  SetIsLoading(true);
  try{
 const ngoRef = dbRef(db,`ngos/${ngoId}/address`);
 await set(ngoRef,address).then(()=>{
  SetIsLoading(false);
  setResponseMessage("Ngo Address Updated Successfully!");
  setTimeout(() => {
    setAddress("")
    setResponseMessage("");
  }, 4000);
 })
  }catch(error){
    SetIsLoading(false);
    SetResponseError("There Is Something Wrong! please try again.");
    setTimeout(() => {
      SetResponseError("");
    }, 4000);
  }
 }
  return (<>  <Sidebar />
  <MainSideOfDashboard />
    <div className='main_area_bottom'>
    <div className='row align-items-center'>

        <div className='col-12'>
        <textarea onChange={(event)=>{setNgoDescription(event.target.value)}} value={ngoDescription} required type="text" pattern="[a-zA-Z]" name="ngodescription" className='ngo_discription m-auto' placeholder='Add A brief Description For Ngo'></textarea>
        <button type="button" className='b' onClick={updateNgoDescription}>Add Description</button>
        </div>
        <div className='col-12'>
          <img src={logoUrl} alt=""></img>
        </div>
        <div className='col-12'> 
        <form name="update_contact_number" className="row" onSubmit={ProcessFileUpload}>
        <label htmlFor="ngo_logo_upload" required>Add Profile Picture</label>
          <input  type="file" id="ngo_logo_upload" name="ngo_logo_upload" accept="image/jpeg,image/png,image/jpg"  className='a' hidden onChange={handleFileChange}/>
      <button className='b' type="submit" >Submit Logo</button>
      </form>
      {file && <div className="selected-file-name">{file.name}</div>}
        </div>
 
      </div>
      <form name="update_contact_number" className="row" onSubmit={updateMobile}>
      <input name="update_ngo_number" required pattern="[0-9]{10}" type="text" placeholder="Update WhatsUp Number" className='a' value={mobile} onChange={(event)=>{setMobile(event.target.value)}}></input>
      <button className='b'  type="submit" >Update Contact</button>
      </form>
      <form name="update_ngo_address" className="row" onSubmit={updateNgoAddress}>
      <input name="update_ngo_address" required pattern="^[A-Za-z0-9\s,'-.]*$" type="text" placeholder="Update Ngo Address" className='a' value={address} onChange={((event)=>{setAddress(event.target.value)})}></input>
      <button className='b'  type="submit" >Update Address</button>
      </form>
    </div>
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
    </>
  )
}

export default Settings