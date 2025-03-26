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
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const clothingImgRef = useRef(new Image());
  const animationFrameRef = useRef(null); // Track animation frame

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

    // Get key pose points for pants positioning
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];
    const leftAnkle = landmarks[27];

    if (!leftHip || !rightHip) {
      console.warn("Hip landmarks not detected.");
      return;
    }

    // Calculate pants dimensions
    const hipWidth = Math.abs(rightHip.x - leftHip.x) * canvas.width * 4.2;
    
    // Calculate height based on available landmarks
    let pantsHeight;
    if (leftAnkle) {
      pantsHeight = Math.abs(leftHip.y - leftAnkle.y) * canvas.height * 2.1;
    } else if (leftKnee) {
      pantsHeight = Math.abs(leftHip.y - leftKnee.y) * canvas.height * 3.1;
    } else {
      pantsHeight = canvas.height * 0.8;
    }

    // Position at waist/hips
    const hipCenterX = (leftHip.x + rightHip.x) / 2;
    const waistY = (leftHip.y + rightHip.y) / 2;
    
    const x = hipCenterX * canvas.width - hipWidth / 2;
    const y = waistY * canvas.height - pantsHeight * 0.1;

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
    animationFrameRef.current = requestAnimationFrame(detectPose);
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
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });

    poseModel.onResults(drawResults);
    poseRef.current = poseModel;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' 
        } 
      });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        videoRef.current.play();
        detectPose();
        setIsCameraOn(true);
        setIsStreaming(true);
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }

    setIsPoseLoaded(true);
  }, [drawResults, detectPose]);

  const pauseCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsCameraOn(false);
  }, []);

  const resumeCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.play();
      detectPose();
      setIsCameraOn(true);
    }
  }, [detectPose]);

  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsStreaming(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [stopCamera]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      {!isPoseLoaded && <p>Loading Pose Model...</p>}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        style={{ display: "none" }} 
      />

      <div className="flex gap-4 mb-4">
        {!isCameraOn ? (
          <button 
            onClick={startPoseDetection} 
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Start Camera
          </button>
        ) : (
          <button 
            onClick={pauseCamera} 
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Pause Camera
          </button>
        )}
        <button 
          onClick={stopCamera} 
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Camera
        </button>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width="640" 
        height="480" 
        style={{ 
          width: '100%', 
          height: 'auto',
          transform: 'scaleX(-1)',
          border: '2px solid #ddd',
          borderRadius: '8px'
        }}
      />
    </div>
  );
};

export default Camerabottom;