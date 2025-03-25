import React, { useRef, useEffect, useState, useCallback } from "react";
import * as pose from "@mediapipe/pose";
import "@tensorflow/tfjs-backend-webgl";
import { useLocation } from "react-router-dom";

const Camerabottom = () => {
  const location = useLocation();
  const clothingImage = location.state?.clothingImage || "";
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const [isPoseLoaded, setIsPoseLoaded] = useState(false);
  const clothingImgRef = useRef(new Image());

  // Load clothing image
  useEffect(() => {
    if (clothingImage) {
      clothingImgRef.current.src = clothingImage;
      clothingImgRef.current.onload = () => console.log("Pants image loaded!");
    }
  }, [clothingImage]);

  // Function to overlay pants at waist/hips
  const applyPantsOverlay = useCallback((ctx, landmarks) => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;

    if (!clothingImgRef.current.complete) {
      console.warn("Pants image not yet loaded.");
      return;
    }

    // Get key pose points
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const leftAnkle = landmarks[27];

    if (!leftHip || !rightHip) {
      console.warn("Hip landmarks not detected.");
      return;
    }

    // **Increase Width for better fit**
    const hipWidth = Math.abs(rightHip.x - leftHip.x) * canvas.width * 4.0; 

    // **Increase Height for full coverage**
    let pantsHeight;
    if (leftAnkle) {
      pantsHeight = Math.abs(leftHip.y - leftAnkle.y) * canvas.height * 2.2; 
    } else if (leftKnee) {
      pantsHeight = Math.abs(leftHip.y - leftKnee.y) * canvas.height * 3.2; 
    } else {
      pantsHeight = canvas.height * 0.8; 
    }

    // Position at waist/hips
    const hipCenterX = (leftHip.x + rightHip.x) / 2;
    const waistY = (leftHip.y + rightHip.y) / 2;

    const x = hipCenterX * canvas.width - hipWidth / 2;
    const y = waistY * canvas.height - pantsHeight * 0.03; // Shift slightly lower

    ctx.drawImage(clothingImgRef.current, x, y, hipWidth, pantsHeight);
  }, []);

  // Draw detected pose and apply pants overlay
  const drawResults = useCallback(
    (results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      if (!results.poseLandmarks || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      applyPantsOverlay(ctx, results.poseLandmarks);
    },
    [applyPantsOverlay]
  );

  // Pose detection loop
  const detectPose = useCallback(async () => {
    if (!poseRef.current || !videoRef.current) return;
    await poseRef.current.send({ image: videoRef.current });
    requestAnimationFrame(detectPose);
  }, []);

  // Initialize and start pose detection
  const startPoseDetection = useCallback(async () => {
    if (!videoRef.current) return;

    const poseModel = new pose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    poseModel.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.7, // Higher confidence for better accuracy
      minTrackingConfidence: 0.7
    });

    poseModel.onResults(drawResults);
    poseRef.current = poseModel;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 720 }, // Increased height for better bottom part visibility
          height: { ideal: 720 }, 
          facingMode: 'user' 
        } 
      });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        // Ensure the canvas matches the video height dynamically
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight * 1.2; // Extend height by 20%
        detectPose();
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }

    setIsPoseLoaded(true);
  }, [drawResults, detectPose]);

  // Cleanup on unmount
  useEffect(() => {
    startPoseDetection();
    return () => {
      if (poseRef.current) {
        poseRef.current.close();
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [startPoseDetection]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '820px', margin: '0 auto' }}>
      {!isPoseLoaded && <p>Loading Pose Model...</p>}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        style={{ display: "none" }} 
      />
      <canvas 
        ref={canvasRef} 
        width="720" 
        height="720" 
        style={{ 
          width: '100%', 
          height: 'auto',
          transform: 'scaleX(-1)' // Mirror the camera view
        }}
      />
    </div>
  );
};

export default Camerabottom;
