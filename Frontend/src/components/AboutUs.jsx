import React from "react";

const AboutUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-500 signika-negative">
            About Our Fashion Studio
          </h1>
          <p>
            Welcome to <span className="text-cyan-500 font-semibold">Bliss</span>, where 
            technology meets fashion! We bring you an innovative **AR-based virtual try-on** 
            experience that lets you visualize outfits before making a purchase.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            At <b>Bliss</b>, we aim to revolutionize online shopping by providing an 
            interactive and immersive way to try on clothes virtually. No more guesswork—just 
            a seamless, fun, and accurate way to find the perfect fit! 
            Founded in <b>2025</b>, we have been redefining online fashion by introducing 
            <b> virtual try-on avatars</b>, allowing customers to visualize outfits in 
            real-time before purchasing.
          </p>

          {/* What We Offer Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-cyan-500">What We Offer</h3>
            <ul className="list-none pl-5 text-gray-700">
              <li>
                <b>Image-Based Try-On</b> – Upload your image and see how the outfit 
                looks on you.
              </li>
              <li>
                <b>AR-Based Try-On</b> – Use your laptop camera to preview outfits 
                in real time.
              </li>
              <li>
                <b>E-Commerce Integration</b> – Browse, select, and purchase your 
                favorite styles effortlessly.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 relative flex items-center justify-center">
          <div className="absolute w-72 h-56 bg-blue-950 shadow-lg transform translate-x-24 translate-y-10 z-10"></div>
          <img
            src="image/l6.jpg"
            alt="Creative Studio"
            className="relative w-80 h-auto shadow-lg z-20"
          />
          <div className="absolute w-64 h-40 bg-orange-200 shadow-lg bottom-[-20px] left-[calc(50%-5rem)] flex items-center justify-center"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
