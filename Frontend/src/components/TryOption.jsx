import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import anim from "../animation/select.json";
import Lottie from "lottie-react";

const TryOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Receiving clothingImage and clothingCategory
  const product = location.state?.clothingImage || null;
  const clothingCategory = location.state?.clothingCategory || "Unknown";

  const handleCameraClick = () => {
    if (!product) return;
    navigate("/camera", { state: { clothingImage: product, clothingCategory } });
  };

  const handleImageClick = () => {
    if (!product) return;
    navigate("/image", { state: { clothingImage: product, clothingCategory } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left: Animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Lottie animationData={anim} className="w-80 h-80 md:w-96 md:h-96" loop={true} />
        </div>

        {/* Right: Text & Buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Try On Options</h1>
          <hr className="border-t-2 border-black w-full mb-4" /> {/* Horizontal Line */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Category: {clothingCategory}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose how you want to try on your selected clothing.
          </p>
          
          <div className="flex flex-col gap-5 w-full">
            <button
              onClick={handleCameraClick}
              className="w-full px-10 py-5 bg-blue-500 text-white text-lg font-semibold rounded-xl shadow-xl hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              📷 Try on Camera
            </button>
            <button
              onClick={handleImageClick}
              className="w-full px-10 py-5 bg-green-500 text-white text-lg font-semibold rounded-xl shadow-xl hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              🖼️ Try on Image
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TryOption;
