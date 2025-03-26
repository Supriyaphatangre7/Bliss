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
          <p className="text-xl">
            Welcome to <span className="text-cyan-500 font-semibold">Bliss</span>, where 
            technology meets fashion! We bring you an innovative <b>AR-based virtual try-on</b> 
             {" "}experience that lets you visualize outfits before making a purchase.
          </p>
          <p className="text-xl">
            At <b>Bliss</b>, we aim to revolutionize online shopping by providing an 
            interactive and immersive way to try on clothes virtually. No more guesswork—just 
            a seamless, fun, and accurate way to find the perfect fit! 
            Founded in <b>2025</b>, we have been redefining online fashion by introducing 
            <b> virtual try-on </b>, allowing customers to visualize outfits in 
            real-time before purchasing.
          </p>

          {/* What We Offer Section */}
           <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-3xl font-semibold text-cyan-500 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Our Innovative Features
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Image-Based Try-On</h4>
                  <p className="text-gray-600">Upload your photo to see outfits on your body with realistic draping and fit</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Real-Time AR Mirror</h4>
                  <p className="text-gray-600">Use your camera to preview outfits in motion with our augmented reality technology</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">E-Commerce Integration</h4>
                  <p className="text-gray-600">Browse, select, and purchase your favorite styles effortlessly.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 relative flex items-center justify-center">
          <div className="absolute ml-35 mb-90 w-72 h-56 bg-blue-950 shadow-lg z-10"></div>
          <img
            src="image/l6.jpg"
            alt="Creative Studio"
            className="relative w-80 h-auto shadow-lg z-20"
          />
          <div className="absolute w-190 h-48 bg-orange-200 shadow-lg bottom-[-20px] left-[calc(30%-10rem)] flex items-center justify-center"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
