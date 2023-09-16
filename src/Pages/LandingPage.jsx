import React,{useContext} from "react";
import {Link} from "react-router-dom";
import WhyYouChooseUsCall  from "../Component/WhyYouChooseUsCall"
import PetAdoptionMadeEasyCall from "../Component/PetAdoptionMadeEasyCall"
import {PetAdoptionMadeEasy, WhyYouChooseUs} from "../PetAdoptionActivitiesArray/PetAdoptionDataArray";
import Footer from "../Component/Footer";
import { SetMetaData } from "../CustomHook/SetMetaData";
import { UserContext } from "../App";
function LandingPage() {
  const {User} = useContext(UserContext);
  SetMetaData(
    "description",
    "Add a wide variety of adoptable pets on Poodles Pet Adoption. Find perfect companion and a loving forever home. Join us in promoting responsible pet adoption. Add Pets Available for Adoption dogs, cats, or other small animals .",
    "Find Your New Furry Friend A New Home With Poodles Pet Adoption | Add Dogs, Cats, And More Animals",

  );
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="section_1 row">
          <div className="left_side col-12 col-md-6">
            <h1 className="left_side_1">
              Let’s Find Homes for Pets Together Join Our Adoption Platform
            </h1>
            <p className="left_side_2">
              Pets are our loyal friends, showering us with love and affection.
              Now it’s our turn to help them find loving homes through our pet
              adoption platform.
            </p>
            {User ?  <Link to="/NgoPets"><button className="btn left_side_3signup text-white">Add New Pet</button></Link>:  
            <Link to="/registration"> <button className="btn left_side_3signup text-white">SignUp</button></Link>}
          </div>
          <div className="second_div_img col-12 col-md-6">
            <img src="./Images/g10.svg" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="section_2 text-white mx-5 border rounded">
        Our mission is to provide a safe and reliable platform for NGOs to
        connect with loving families who are looking to adopt pets. We are
        committed to promoting responsible pet ownership and to working towards
        a future where every pet has a loving home
      </div>
      <div className="section_3 m-5 border border-dlight">
        <h3>
          Pet Adoption Made Easy: How Our Platform Connects NGOs and Adopters.
        </h3>
        <div className="adoption row">
          {PetAdoptionMadeEasy.map((arr) => (
            <PetAdoptionMadeEasyCall
              key={arr.id}
              img={arr.img}
              heading={arr.heading}
              paragraph={arr.paragraph}
            />
          ))}
        </div>
      </div>
      <div className="section_4 m-5 border">
        <h3>
          Why Choose Our Pet Adoption Platform: Connecting NGOs and Adopters
        </h3>
        <div className="connection row row-cols-3 g-0">
          {WhyYouChooseUs.map((arr) => (
            <WhyYouChooseUsCall
              key={arr.id}
              img={arr.img}
              heading={arr.heading}
              paragraph={arr.paragraph}
            />
          ))}
        </div>
      </div>
      <div className="section_5 m-7 ">
        <div className="all">
          <div className="panja_div d-flex">
            <h2>JOIN OUR NEWSLETTER</h2>
            <svg className="mx-4 panja_img" xmlns="http://www.w3.org/2000/svg" width="66" height="53" viewBox="0 0 66 53" fill="none">
              <path d="M39.1537 40.2761C39.4809 45.4211 36.6345 53.3415 25.1778 52.0714C19.32 50.5133 19.4077 47.1855 18.0281 45.2076C15.5127 41.6536 9.54286 43.1393 5.18711 41.9662C1.41324 40.9502 -0.692698 36.8099 0.206519 33.9508C1.55161 29.6742 8.21135 26.5044 14.0776 25.5257C35.6562 21.9263 37.3557 25.0376 39.1537 40.2761Z" fill="#F5F5F5" />
              <path d="M13.1718 23.1303C17.7509 23.529 22.1872 19.431 23.0805 13.9769C23.9737 8.52282 20.9856 3.77826 16.4062 3.37957C11.8272 2.98089 7.39093 7.07907 6.49773 12.5332C5.6045 17.9872 8.59254 22.7317 13.1718 23.1303Z" fill="#F5F5F5" />
              <path d="M29.9821 19.0987C34.3673 20.1396 39.8156 16.7502 42.151 11.528C44.4865 6.30592 42.825 1.22875 38.4401 0.187852C34.0548 -0.853029 28.6066 2.53654 26.2711 7.75865C23.9354 12.9807 25.5972 18.058 29.9821 19.0987Z" fill="#F5F5F5" />
              <path d="M42.9882 24.1966C46.3976 26.461 53.2738 25.0046 58.3467 20.9439C63.4198 16.8831 64.7683 11.7556 61.3588 9.49137C57.9494 7.22711 51.0732 8.68346 46.0003 12.7442C40.9275 16.8049 39.579 21.9325 42.9882 24.1966Z" fill="#F5F5F5" />
              <path d="M43.4481 39.0235C46.393 41.6316 53.3936 40.8068 59.0849 37.1811C64.7762 33.5554 67.0026 28.5019 64.058 25.8938C61.1134 23.2858 54.1124 24.1107 48.4211 27.7365C42.7298 31.362 40.5034 36.4155 43.4481 39.0235Z" fill="#F5F5F5" />
            </svg>
            </div>
            <p className="px-2">
              Discover the Extraordinary World of Pet Adoption: Find Love,
              Loyalty, and Cuteness with Our Platform
            </p>
            <div className="connect">
              <input type="email" className="border-0 border rounded" />
              <button className="border-0 border rounded">Join Us</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      );
}

      export default LandingPage;
