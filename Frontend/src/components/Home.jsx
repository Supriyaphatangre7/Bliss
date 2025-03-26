import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import Pslider from "./Pslider";
import Slider from "./Slider";

const Home = () => {
  return (
    <>
      <Slider />
      <Hero />
      <div className="py-12 px-6">
        <div className="max-w-[85vw] mx-auto text-center">
          <h1 className="text-4xl font-bold mb-10 text-cyan-500">
            How It Works
          </h1>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl ">👗</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Select Your Outfit
                </h2>
              </div>
              <p className="text-gray-600">
                Browse our stylish collection and pick the clothing items you
                want to try.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl ">🛠️</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Choose Your Try-On Method
                </h2>
              </div>
              <p className="text-gray-600">
                Select between <b>Image-Based</b> (upload your photo) or{" "}
                <b>AR-Based</b> (use your webcam for live try-on).
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl ">📸</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Upload Your Image
                </h2>
              </div>
              <p className="text-gray-600">
                If you choose Image-Based, upload a clear full-body photo to see
                how the outfit fits.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl ">🔍</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Adjust & Preview
                </h2>
              </div>
              <p className="text-gray-600">
                Fine-tune the outfit placement for the best fit.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl ">🕶️</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Try with AR
                </h2>
              </div>
              <p className="text-gray-600">
                If you choose AR-Based, activate your webcam for an immersive
                experience.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl ">🛒</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Shop with Confidence
                </h2>
              </div>
              <p className="text-gray-600">
                Love the look? Proceed to checkout and grab your perfect outfit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Categories />
      <Pslider />

      <div className="why-choose-us  py-12 px-6 text-center justify-center">
        <h2 className="text-4xl font-bold mb-6 text-cyan-500">Why Choose Us?</h2>
        <div className="max-w-[85vw] mx-auto grid md:grid-cols-3 gap-6 justify-self-center">
          <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🔍 Realistic Try-On</h3>
            <p>
              Experience high-accuracy outfit overlays using AI-powered image
              processing.
            </p>
          </div>
          <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">
              💡 AR-Powered Shopping
            </h3>
            <p>
              See how outfits look on you in real time using augmented reality.
            </p>
          </div>
          <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">
              🎨 Image-Based Fitting
            </h3>
            <p>
              Upload your own image for a precise, non-live try-on experience.
            </p>
          </div>
        </div>
      </div>

      <div className="card card-side bg-base-100 shadow-sm ml-5 mt-7">
        <div className="card-image">
          <img src="image/z2.jpg" alt="Movie " />
        </div>

        <div className="card-body ">
          <img src="image/z6.jpg" alt="Movie" />
        </div>
      </div>

      <div className="poster w-full mt-10">
        <img
          src="image/d2.jpeg" // Replace with your image path
          alt="h"
          className="w-full h-auto max-h-[700px] object-cover"
        />
      </div>
    </>
  );
};

export default Home;
