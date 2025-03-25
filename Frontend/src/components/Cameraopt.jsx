import React, { useRef, useEffect, useState, useCallback } from "react";
import * as poseModule from "@mediapipe/pose";
import "@tensorflow/tfjs-backend-webgl";
import { useLocation } from "react-router-dom";

const Cameraopt = () => {
  const location = useLocation();
  const subcategory = location.state?.subcategory || "top"; // Default to "top"
  const clothingImage = location.state?.clothingImage || "";
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseModelRef = useRef(null);
  const [isPoseLoaded, setPoseLoaded] = useState(false);
  const [isClothingReady, setClothingReady] = useState(false);
  const clothingImgRef = useRef(new Image());

  // Load clothing image
  useEffect(() => {
    if (!clothingImage) {
      setClothingReady(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = clothingImage;

    img.onload = () => {
      console.log("Clothing image loaded successfully");
      clothingImgRef.current = img;
      setClothingReady(true);
    };

    img.onerror = (err) => {
      console.error("Failed to load clothing image:", err);
      setClothingReady(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [clothingImage]);

  // Function to overlay clothing
  const overlayClothing = useCallback(
    (ctx, landmarks) => {
      const canvas = canvasRef.current;
      if (!canvas || !ctx || !isClothingReady || !clothingImgRef.current) return;

      const img = clothingImgRef.current;

      if (!img.complete || img.naturalWidth === 0) {
        console.warn("Clothing image not ready for drawing");
        return;
      }

      const leftShoulder = landmarks?.[11];
      const rightShoulder = landmarks?.[12];
      const leftHip = landmarks?.[23];
      const rightHip = landmarks?.[24];

      if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
        console.warn("Essential landmarks not detected.");
        return;
      }

      try {
        const clothingWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvas.width * 2.1;
        let clothingHeight, x, y;

        if (subcategory === "bottom") {
          // Position from the waist for bottom wear
          clothingHeight = Math.abs(rightHip.y - leftHip.y) * canvas.height * 2;
          x = ((leftHip.x + rightHip.x) / 2) * canvas.width - clothingWidth / 2;
          y = leftHip.y * canvas.height;
        } else {
          // Position from the neck for tops
          const torsoHeight = Math.abs(leftHip.y - leftShoulder.y) * canvas.height;
          clothingHeight = torsoHeight * 1.3;
          x = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width - clothingWidth / 2;
          y = leftShoulder.y * canvas.height - clothingHeight * 0.2;
        }

        ctx.drawImage(img, x, y, clothingWidth, clothingHeight);
      } catch (error) {
        console.error("Error drawing clothing:", error);
      }
    },
    [isClothingReady, subcategory]
  );

  // Draw detected pose and apply clothing overlay
  const drawResults = useCallback(
    (results) => {
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
        ctx.arc(
          landmark.x * canvas.width,
          landmark.y * canvas.height,
          5,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "red";
        ctx.fill();
      });

      overlayClothing(ctx, results.poseLandmarks);
    },
    [overlayClothing]
  );

  // Pose detection loop
  const detectPose = useCallback(async () => {
    if (!poseModelRef.current || !videoRef.current) return;
    await poseModelRef.current.send({ image: videoRef.current });
    requestAnimationFrame(detectPose);
  }, []);

  // Initialize and start pose detection
  const startPoseDetection = useCallback(async () => {
    if (!videoRef.current) return;

    console.log("Initializing pose detection...");

    const poseModel = new poseModule.Pose({
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
    poseModelRef.current = poseModel;

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

    setPoseLoaded(true);
  }, [drawResults, detectPose]);

  useEffect(() => {
    startPoseDetection();
  }, [startPoseDetection]);

  return (
    <div>
      {!isPoseLoaded && <p>Loading Pose Model...</p>}
      {!isClothingReady && clothingImage && <p>Loading Clothing Image...</p>}
      <video ref={videoRef} autoPlay playsInline muted style={{ display: "none" }} />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
};

export default Cameraopt;
