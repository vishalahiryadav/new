import React ,{useState,useContext}from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
 import { db,set,push,dbRef } from "../firebase.js";
import InputField from "./InputField.jsx";
import { UserContext } from "../App.js";
const storage = getStorage();
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB
const MAX_FILE_COUNT = 4;
const apikey = process.env.REACT_APP_OPENCODE_API_KEY;
function AddNewPet(){
  const storageRef = ref(storage);
  const{User,ngoId}=useContext(UserContext);
const [IsLoading,SetIsLoading]=useState(false);
const[ResponseMessage,SetResponseMesage]=useState("");
const[ResponseError,SetResponseError]=useState("");
 const[files,setFiles]=useState([]);
  const[petDetails,setPetDetails]=useState({
    pettype:"",
    petname:"",
    breed:"",
    age:"",
    petgender:"",
    city:"",
    description:"",
    address:"",
    medicalhistory:"",
    adoptionrequirements:"",
    behaviourinfo:"",
  });
  function handlesetPetDetails(event){
    const newValue = event.target.value;
    const Inputname = event.target.name;
    setPetDetails((prevValue)=>{
      return{
    ...prevValue,
    [Inputname]:newValue
      }
    })
    }
    const handleFileChange = (event)=>{
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        let sizeError = false;
       let fileError = false;
       let allFilesValid = true;
       const validFiles = selectedFilesArray.filter((file)=>{
        const isValidFileSize = file.size <= MAX_FILE_SIZE;
        const isValidType = validateFileType(file);
        if(!isValidFileSize){
          sizeError = true;

        }
        if(!isValidType){
            fileError= true;
        }
        if(!isValidFileSize || !isValidType){
            allFilesValid = false;
        }
      return isValidFileSize && isValidType && files.length <= MAX_FILE_COUNT;
       });
       if (sizeError && fileError) {
        console.log("INVALID FILE TYPE AND FILE SIZE IS EXCEEDING THE LIMIT!");
      } else if (sizeError) {
        console.log("Invalid file size selected.");
      } else if (fileError) {
        console.log("Invalid file type selected.");
      }
      if(allFilesValid){
        setFiles([...files, ...validFiles]);
      }

    }
    const validateFileType = (file)=>{
        const allowedTypes = ["image/jpeg", "image/png","image/jpg"];
        return allowedTypes.includes(file.type);
    }
    const handlePetData = async()=>{
      
      const {pettype,petname,breed,age,petgender,city,description,address,medicalhistory,adoptionrequirements,behaviourinfo}=petDetails;    
      console.log("ngoid",ngoId);
    const petCoordinates= await   getCoordinatesOfPet();
    try{
 const newPetRef = push(dbRef(db,`pets`));
 const newPetKey = newPetRef.key;
 const petData ={
  ngoId,
  petId:newPetKey,
  status:'available',
  petname,
  category:pettype,
  breed,
  age,
  petgender,
  city,
  description,
  address,
  medicalhistory,
  adoptionrequirements,
  behaviourinfo,
  ...petCoordinates,
  createdAt:  new Date(),
 }
 console.log("petData",petData);
 await set(newPetRef,petData)
  await  HandleFileUpload(newPetKey).then(()=>{
    SetResponseMesage("Pet Added Successfully!");
    setTimeout(() => {
      SetResponseMesage(null);
    }, 3000);
  })
         console.log("new pet")
     }catch(error){
       console.log(error);
     }
     }
     const HandleFileUpload =async(petId)=>{
      for(const file of files){
       const fileRef =ref(storageRef,`petImages/${file.name}`);
       try{
     const snapshot = await uploadBytes(fileRef,file);
     const downloadUrl = await getDownloadURL(snapshot.ref);
     const fileData = {
       __filename:file.name,
       __filePath:downloadUrl
    }
    const newPetFileRef = push(dbRef(db,`pets/${petId}/files`));
    await set(newPetFileRef,fileData);
       }catch(error){
         console.log(error);
       }
      }
     }
     const getCoordinatesOfPet = async()=>{
       const {address}=petDetails;
       const encodedAddress = encodeURIComponent(address);
       try{
       const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${apikey}&q=${encodedAddress}&countrycode=IN`);
       const data = await response.json();
       if(data.status.code === 200){
         if(data.results.length > 0){
           const formattedAddress = data.results[0].formatted;
           const longAndLati = data.results[0].geometry;
           const petCoordinates ={
             __petlatitude: longAndLati.lat,
             __petlongitude: longAndLati.lng           
            }
          
           return petCoordinates;
         }else{
           console.log("could not find the address");
         }
      }else{
         console.log("the link might be broken")
      }
      }
       catch(error){
        console.log(error)
      }
    
      
    }
   const AddNewPet = async(e)=>{
    SetIsLoading(true);
    try{
       e.preventDefault();
      handlePetData().then(()=>{
        SetIsLoading(false)
      }).then(()=>{
        setPetDetails(
          {
            pettype:"",
            petname:"",
            breed:"",
            age:"",
            petgender:"",
            city:"",
            description:"",
            address:"",
            medicalhistory:"",
            adoptionrequirements:"",
            behaviourinfo:"",
          }
        )
        
      })
    }catch(error){
       console.log(error);
     }
    }
    return(<>
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
      <div className="addnew-pet-form-container">
      <form name="add-new-pet-form" method="POST" onSubmit={AddNewPet}>
 
      <div className="addpet-radio-container">
  <label className="add-pet-radio-label mt-3 mb-3" htmlFor="pettype">Pet's Type</label>
  <div className="row">
  <div className="col-12 col-md-3">
    <input type="radio" id="dog" name="pettype" className="addnewpet_form_input" value="dog"  checked={petDetails.pettype === "dog"} onChange={handlesetPetDetails}/>
    <label htmlFor="dog">Dog</label>
  </div>
  <div className="col-12 col-md-3">
    <input type="radio" id="cat" name="pettype" className="addnewpet_form_input" value="cat"   checked={petDetails.pettype === "cat"} onChange={handlesetPetDetails}/>
    <label htmlFor="cat">Cat</label>
  </div>
  <div className="col-12 col-md-3">
    <input type="radio" id="bird" name="pettype" className="addnewpet_form_input" value="bird"   checked={petDetails.pettype === "bird"} onChange={handlesetPetDetails} />
    <label htmlFor="bird">Birds</label>
  </div>
  <div className="col-12 col-md-3">
    <input type="radio" id="other" name="pettype" className="addnewpet_form_input" value="other"   checked={petDetails.pettype === "other"} onChange={handlesetPetDetails}/>
    <label htmlFor="other">Others</label>
  </div>
  </div>
</div>
      <InputField required pattern="[A-Za-z\s]+" type="text" name="petname" placeholder=" Pet's Name " className="addnewpet_form_input mt-3 mb-3" value={petDetails.petname} onChange={handlesetPetDetails}/>
      <div className="addpet-radio-container">
  <label className="add-pet-radio-label mt-3 mb-3" htmlFor="age">Pet's Age</label>
  <div className="row">
  <div className="col-12 col-md-3">
    <input type="radio" id="Puppy" name="age" className="addnewpet_form_input" value="Puppy"  checked={petDetails.age === "Puppy"} onChange={handlesetPetDetails}/>
    <label htmlFor="Puppy">Puppy</label>
  </div>
  <div className="col-12 col-md-3">
    <input type="radio" id="Young" name="age" className="addnewpet_form_input" value="Young"   checked={petDetails.age === "Young"} onChange={handlesetPetDetails}/>
    <label htmlFor="Young">Young</label>
  </div>
  <div className="col-12 col-md-3">
    <input type="radio" id="Adult" name="age" className="addnewpet_form_input" value="Adult"   checked={petDetails.age === "Adult"} onChange={handlesetPetDetails} />
    <label htmlFor="Adult">Adult</label>
  </div>
  <div className="col-12 col-md-3">
    <input type="radio" id="Senior" name="age" className="addnewpet_form_input" value="Senior"   checked={petDetails.age === "Senior"} onChange={handlesetPetDetails}/>
    <label htmlFor="Senior">Senior</label>
  </div>
  </div>
</div>
    <InputField required pattern="[A-Za-z\s]+" type="text" name="breed" placeholder=" Pet's Breed " className="addnewpet_form_input mt-3 mb-3" value={petDetails.breed} onChange={handlesetPetDetails}/>
    <div className="addpet-radio-container">
  <label className="add-pet-radio-label mt-3 mb-3" htmlFor="petgender">Pet's Gender</label>
  <div className="row">
  <div className="col-12 col-md-6">
    <input type="radio" id="female" name="petgender" className="addnewpet_form_input" value="female"  checked={petDetails.petgender === "female"} onChange={handlesetPetDetails}/>
    <label htmlFor="female">Female</label>
  </div>
  <div className="col-12 col-md-6">
    <input type="radio" id="male" name="petgender" className="addnewpet_form_input" value="male"   checked={petDetails.petgender === "male"} onChange={handlesetPetDetails}/>
    <label htmlFor="male">Male</label>
  </div>
  </div>
</div>
    <InputField required pattern="[A-Za-z\s]+" type="text" name="city" placeholder=" Pet's City " className="addnewpet_form_input m-2" value={petDetails.city} onChange={handlesetPetDetails}/>
    <InputField required  type="text" name="description" placeholder=" Pet's Description " className="addnewpet_form_inpu m-2t" value={petDetails.description} onChange={handlesetPetDetails} />
    <InputField required  type="text" name="adoptionrequirements" placeholder=" Adoption Requirements " className="addnewpet_form_input m-2" value={petDetails.adoptionrequirements} onChange={handlesetPetDetails}/>
    <InputField required  type="text" name="address" placeholder=" Pet's Address " className="addnewpet_form_input m-2" value={petDetails.address} onChange={handlesetPetDetails}/>
    <InputField required  type="text" name="medicalhistory" placeholder=" Pet's Medical History " className="addnewpet_form_input m-2" value={petDetails.medicalhistory} onChange={handlesetPetDetails}/>
    <InputField required  type="text" name="behaviourinfo" placeholder=" Pet's Behaviour Info " className="addnewpet_form_input m-2" value={petDetails.behaviourinfo} onChange={handlesetPetDetails}/>
    <input type="file" name="add_new_file" multiple accept="image/jpeg,image/png,image/jpg" className="add_new_file"  onChange={handleFileChange}></input>
    <button type="submit" >Add New Pet</button>
      </form>
      </div>
    
   
    </>
    )
}
export default AddNewPet