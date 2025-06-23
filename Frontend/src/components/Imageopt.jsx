import React, { useRef, useEffect, useState, useCallback } from "react";
import * as pose from "@mediapipe/pose";
import "@tensorflow/tfjs-backend-webgl";
import { useLocation } from "react-router-dom";

const Imageopt = () => {
  const location = useLocation();
  const clothingImage = location.state?.clothingImage || "";
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedSize, setDetectedSize] = useState("");
  const fileInputRef = useRef(null);
  const clothingImgRef = useRef(new Image());

  useEffect(() => {
    if (clothingImage) {
      clothingImgRef.current.src = clothingImage;
      clothingImgRef.current.onload = () => console.log("Clothing image loaded!");
    }
  }, [clothingImage]);

  const determineSize = (shoulderWidth, torsoHeight) => {
    if (shoulderWidth < 100 && torsoHeight < 200) return "XS";
    if (shoulderWidth < 120 && torsoHeight < 250) return "S";
    if (shoulderWidth < 140 && torsoHeight < 280) return "M";
    if (shoulderWidth < 160 && torsoHeight < 310) return "L";
    return "XL";
  };

  const applyClothingOverlay = useCallback((ctx, landmarks) => {
    if (!ctx || !canvasRef.current) return;
    if (!clothingImgRef.current.complete) return;

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return;

    const canvas = canvasRef.current;
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvas.width;
    const torsoHeight = Math.abs(leftHip.y - leftShoulder.y) * canvas.height;

    const sizeCategory = determineSize(shoulderWidth, torsoHeight);
    setDetectedSize(sizeCategory);

    const clothingWidth = shoulderWidth * 1.6;
    const clothingHeight = torsoHeight * 1.1;

    const x = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width - clothingWidth / 2;
    const y = leftShoulder.y * canvas.height - clothingHeight * 0.30;

    ctx.drawImage(clothingImgRef.current, x, y, clothingWidth, clothingHeight);
  }, []);

  const drawResults = useCallback((results) => {
    if (!results.poseLandmarks || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const imgElement = new Image();
    imgElement.src = uploadedImage;
    imgElement.onload = () => {
      ctx.drawImage(imgElement, 0, 0, canvasRef.current.width, canvasRef.current.height);
      applyClothingOverlay(ctx, results.poseLandmarks);
    };
  }, [applyClothingOverlay, uploadedImage]);

  const processImage = useCallback(async () => {
    if (!poseRef.current || !uploadedImage) return;
    setIsProcessing(true);

    const imgElement = new Image();
    imgElement.src = uploadedImage;
    imgElement.onload = async () => {
      await poseRef.current.send({ image: imgElement });
      setIsProcessing(false);
    };
  }, [uploadedImage]);

  useEffect(() => {
    const loadPoseModel = async () => {
      poseRef.current = new pose.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseRef.current.onResults(drawResults);
    };

    loadPoseModel();
  }, [drawResults]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = `virtual-tryon-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Virtual Try-On</h1>
      <div className="w-full h-[2px] bg-black mt-2 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="md:col-span-2 bg-white p-4 rounded-lg flex flex-col items-center shadow-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Preview</h2>
          <canvas
            ref={canvasRef}
            width="640"
            height="680"
            className="border rounded-md shadow-lg"
          />
        </div>

        <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-2xl max-h-fit w-100 mt-30">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Controls</h2>

          <div className="flex flex-col items-center gap-4 w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"/>

            <button
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-3 w-full text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-indigo-600 hover:to-blue-500 transition-all flex items-center gap-3 shadow-xl">
              {uploadedImage ? "Change Photo" : "Upload Photo"}
            </button>

            <button
              onClick={processImage}
              disabled={isProcessing}
              className={`px-6 py-3 w-full text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-purple-500 transition-all flex items-center gap-3 shadow-xl ${isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isProcessing ? "Processing..." : "Analyze Pose"}
            </button>

            {detectedSize && (
              <div className="mt-2 p-3 bg-blue-100 text-blue-800 rounded">
                Recommended Size: {detectedSize}
              </div>
            )}

            <button
              onClick={handleDownload}
              className="px-6 py-3 w-full text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-green-500 transition-all flex items-center gap-3 shadow-xl"
            >
              Download Image
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 w-full text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-red-500 transition-all flex items-center gap-3 shadow-xl"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imageopt;