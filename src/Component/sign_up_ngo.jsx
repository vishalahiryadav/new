import React from "react";
function SignUpNgo() {
  const image  = "./Images/InputFileImg.png"
  return (
    <div className="sign_up_form row g-0">
      <div className="left_img_container">
      <img
        src="./Images/sign_up_ngo_page_image.svg"
        className=" sign_up_img col-12 col-md-6"
      />
      </div>
      <div className="sign_up_right_section col-12 col-md-6 d-flex">
        <h1>Create Ngo Profile</h1>
      
        <input className="input_box" type="text" placeholder="Ngo Name" />
        <input className="input_box" type="email" placeholder="Ngo Email" />
        <input className="input_box" type="number" placeholder="Ngo Mobile" />
        <input className="input_box" type="password" placeholder="Password" />
        <input className="input_box" type="password" placeholder="Confirm PAssword" />


        <label for="image_uploads"><img src={image} className="img-fluid" /></label>
    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple hidden />


        <div className="checkbox_container d-flex">
        <input type="checkbox" name="" id="" className="input_checkbox" />
        <span><p className="mb-0 term">I Agree To All Term And Privacy Policy.</p></span>
        </div>
        <button className="create_account_button">Create Account</button>
      </div>
    </div>
  );
}

export default SignUpNgo;
// Images\Frame 11.p