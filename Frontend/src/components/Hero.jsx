import React from "react";
import Lottie from "lottie-react"
import anim1 from "../animation/h1.json"

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white text-gray-900 px-10 md:px-20 py-16">
      {/* Left Side - Text Content with Slightly Reduced Width */}
      <div className="w-full md:w-3/5 space-y-6 order-1">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Elevate Your Style with the Latest Trends on <u>AVATAR</u>
        </h2>
        <p className="text-lg md:text-xl font-medium">
          Explore our premium collection designed for elegance, comfort, and uniqueness.
        </p>
        <button className="btn btn-neutral rounded-lg px-6 py-3 text-lg font-semibold hover:bg-gray-700 hover:scale-105 transition">
          Try Now
        </button>
      </div>

      {/* Right Side - Avatar Image Shifted Left */}
      <div className="order-2 transform -translate-x-10 md:-translate-x-20">
        <img src="image/l2.png" alt="Fashion Avatar" className="w-48 md:w-64" />
      </div>
    </div>
  );
};

export default Hero;
