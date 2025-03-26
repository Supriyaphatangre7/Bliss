import React, { useRef, useEffect, useState, useCallback } from "react";
import * as pose from "@mediapipe/pose";
import "@tensorflow/tfjs-backend-webgl";
import { useLocation } from "react-router-dom";

const Cameraopt = () => {
  const location = useLocation();
  const clothingImage = location.state?.clothingImage || "";
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const [isPoseLoaded, setIsPoseLoaded] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const clothingImgRef = useRef(new Image());

  useEffect(() => {
    if (clothingImage) {
      clothingImgRef.current.src = clothingImage;
      clothingImgRef.current.onload = () => console.log("Clothing image loaded!");
    }
  }, [clothingImage]);

  const applyClothingOverlay = useCallback((ctx, landmarks) => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;

    if (!clothingImgRef.current.complete) {
      console.warn("Clothing image not yet loaded.");
      return;
    }

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
      console.warn("Essential landmarks not detected.");
      return;
    }

    const clothingWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvas.width * 2.1;
    const torsoHeight = Math.abs(leftHip.y - leftShoulder.y) * canvas.height;
    const clothingHeight = torsoHeight * 1.3;
    const x = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width - clothingWidth / 2;
    const y = leftShoulder.y * canvas.height - clothingHeight * 0.3;

    ctx.drawImage(clothingImgRef.current, x, y, clothingWidth, clothingHeight);
  }, []);

  const drawResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!results.poseLandmarks || !ctx) {
      console.warn("No pose landmarks detected.");
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    results.poseLandmarks.forEach((landmark) => {
      ctx.beginPath();
      ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });

    applyClothingOverlay(ctx, results.poseLandmarks);
  }, [applyClothingOverlay]);

  const detectPose = useCallback(async () => {
    if (!poseRef.current || !videoRef.current) return;
    await poseRef.current.send({ image: videoRef.current });
    requestAnimationFrame(detectPose);
  }, []);

  const startPoseDetection = useCallback(async () => {
    if (!videoRef.current) return;

    const poseModel = new pose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    poseModel.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    poseModel.onResults(drawResults);
    poseRef.current = poseModel;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        detectPose();
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }

    setIsPoseLoaded(true);
    setIsCameraOn(true);
  }, [drawResults, detectPose]);

  const pauseCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsPoseLoaded(false);
    setIsCameraOn(false);
  }, []);


  const stopCamera = () => {
    setIsStreaming(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {!isPoseLoaded && <p>Loading Pose Model...</p>}
      <div className="flex gap-4">
        <button onClick={startPoseDetection} disabled={isCameraOn} className="px-4 py-2 bg-green-500 text-white rounded-md">Start Camera</button>
        <button onClick={pauseCamera} disabled={!isCameraOn} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Pause Camera</button>
        <button onClick={stopCamera} className="px-4 py-2 bg-red-500 text-white rounded">Stop Camera</button>
      </div>
      <video ref={videoRef} autoPlay playsInline muted style={{ display: "none" }} />
      <canvas ref={canvasRef} width="640" height="480" className="border-3 rounded-2xl h-[90vh] shadow-gray-600" />
    </div>
  );
};

export default Cameraopt;
