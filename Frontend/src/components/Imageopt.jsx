import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";

const Imageopt = () => {
  const location = useLocation();
  const productImage = location.state?.clothingImage || "";
  const [userImage, setUserImage] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userImage || !productImage) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
      backgroundColor: '#f5f5f5' // Add background color
    });

    const userImageUrl = URL.createObjectURL(userImage);

    // Load User Image
    fabric.Image.fromURL(userImageUrl, (img) => {
      // Calculate scaling while maintaining aspect ratio
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      
      // Center the image
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      img.set({
        selectable: false,
        originX: 'center',
        originY: 'center',
        left: centerX,
        top: centerY,
        scaleX: scale * 0.9, // Slightly smaller to add padding
        scaleY: scale * 0.9,
      });

      canvas.setBackgroundImage(img, () => {
        // Load Product Image
        fabric.Image.fromURL(productImage, (prod) => {
          // Position clothing at upper center (chest area)
          prod.set({
            left: centerX,
            top: centerY * 0.7, // Higher position for clothing
            originX: 'center',
            originY: 'center',
            scaleX: 0.5,
            scaleY: 0.5,
            selectable: true,
            hasControls: true,
            lockRotation: true,
            lockScalingFlip: true,
            transparentCorners: false
          });

          canvas.add(prod);
          canvas.renderAll();
        }, {
          crossOrigin: 'anonymous'
        });
      }, {
        crossOrigin: 'anonymous'
      });
    }, {
      crossOrigin: 'anonymous'
    });

    return () => {
      canvas.dispose();
      URL.revokeObjectURL(userImageUrl);
    };
  }, [userImage, productImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setUserImage(file);
    }
  };

  if (!userImage) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
        <p className="mb-4 text-center">Upload a full-body photo for best results</p>
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Select Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={800} 
          className="border shadow-lg"
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Change Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Imageopt;