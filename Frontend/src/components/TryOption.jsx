import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TryOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.clothingImage || null;

  const handleCameraClick = () => {
    if (!product) return;
    navigate("/camera", { state: { clothingImage: product } });
  };

  const handleImageClick = () => {
    if (!product) return;
    navigate("/image", { state: { clothingImage: product } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl font-semibold">Try On Options</h1>
      <div className="flex gap-4">
        <button
          onClick={handleCameraClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Try on Camera
        </button>
        <button
          onClick={handleImageClick}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Try on Image
        </button>
      </div>
    </div>
  );
};

export default TryOption;