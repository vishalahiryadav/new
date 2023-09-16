import React from "react";

function SignUp() {
  return (
    <div className="sign_up_form row g-0">
      <img
        src={require("./sign_up_page_image.svg").default}
        className="img-fluid sign_up_img col-12 col-md-6"
      />
      <div className="sign_up_right_section col-12 col-md-6 d-flex">
        <h1>Create Your Account</h1>
        <button className="google_signup_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.3rem"
            height="3.4rem"
            viewBox="0 0 33 34"
            fill="none"
          >
            <path
              d="M33 17.3976C33 27.0972 26.4473 34 16.7705 34C7.49262 34 0 26.4048 0 17C0 7.59516 7.49262 0 16.7705 0C21.2877 0 25.0881 1.67944 28.0162 4.44879L23.4516 8.89758C17.4805 3.05726 6.37684 7.44436 6.37684 17C6.37684 22.9294 11.0496 27.7347 16.7705 27.7347C23.4111 27.7347 25.8996 22.9089 26.2918 20.4069H16.7705V14.5597H32.7363C32.8918 15.4302 33 16.2665 33 17.3976Z"
              fill="#8648D5"
            />
          </svg>
          Sign Up With Google
        </button>
        <div className="hr_container d-flex">
          <img src={require("./Line.svg").default} className="img-fluid" />
          <h2 className="mx-5">Or</h2>
          <img src={require("./Line.svg").default} className="img-fluid" />
        </div>
      
        <input className="input_box" type="text" placeholder="FullName" />
        <input className="input_box" type="email" placeholder="Email" />
        <input className="input_box" type="number" placeholder="Ngo Mobile" />
        <input className="input_box" type="password" placeholder="Password" />
        <input className="input_box" type="password" placeholder="Confirm PAssword" />
        <div className="checkbox_container d-flex">
        <input type="checkbox" name="" id="" className="input_checkbox" />
        <span><p className="mb-0">I Agree To All Term And Privacy Policy.</p></span>
        </div>
        <button className="create_account_button">Create Account</button>
      </div>
    </div>
  );
}

export default SignUp;
