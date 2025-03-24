import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Categories from "./Categories";
import AboutUs from "./AboutUs";
import Feature from "./Feature";
import Pslider from "./Pslider";
import Slider from "./Slider";


const Home = () => {
  return (
    <>
     <Slider />
      <Pslider />
      <Hero />
      
      <Categories />

 <div className="card card-side bg-base-100 shadow-sm ml-5 mt-7">
    <div className="card-image">
    <img src="image/z2.jpg" alt="Movie "/>
    </div>

  <div className="card-body ">
      <img src="image/z6.jpg" alt="Movie"  />
  </div>
</div>


<div className="poster w-full mt-10">
  <img
    src="image/d2.jpeg" // Replace with your image path
    alt="h"
    className="w-full h-auto max-h-[700px] object-cover"
  />
</div>
    {/* <AboutHome/> */}
    <AboutUs/>

  
     <Feature/>
   

   
    </>
  );
};

export default Home;
