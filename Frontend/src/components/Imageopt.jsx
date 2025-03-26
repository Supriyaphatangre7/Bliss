import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";

const Imageopt = () => {
  const location = useLocation();
  const productImage = location.state?.clothingImage || "";
  const clothingCategory = location.state?.clothingCategory || "Unknown"; // Receive category
  const [userImage, setUserImage] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userImage || !productImage) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
      backgroundColor: "#f5f5f5",
    });

    const userImageUrl = URL.createObjectURL(userImage);

    // Load User Image
    fabric.Image.fromURL(
      userImageUrl,
      (img) => {
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        img.set({
          selectable: false,
          originX: "center",
          originY: "center",
          left: centerX,
          top: centerY,
          scaleX: scale * 0.9,
          scaleY: scale * 0.9,
        });

        canvas.setBackgroundImage(
          img,
          () => {
            // Load Product Image (Clothing)
            fabric.Image.fromURL(
              productImage,
              (prod) => {
                prod.set({
                  left: centerX,
                  top: centerY * 0.7,
                  originX: "center",
                  originY: "center",
                  scaleX: 0.5,
                  scaleY: 0.5,
                  selectable: true,
                  hasControls: true,
                  lockRotation: true,
                  lockScalingFlip: true,
                  transparentCorners: false,
                });

                canvas.add(prod);
                canvas.renderAll();
              },
              { crossOrigin: "anonymous" }
            );
          },
          { crossOrigin: "anonymous" }
        );
      },
      { crossOrigin: "anonymous" }
    );

    return () => {
      canvas.dispose();
      URL.revokeObjectURL(userImageUrl);
    };
  }, [userImage, productImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      setUserImage(file);
    }
  };


  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the canvas image as the href
    link.href = canvasRef.current.toDataURL({
      format: 'png',
      quality: 1.0
    });
    
    // Set the download filename
    link.download = `virtual-tryon-${clothingCategory}-${new Date().getTime()}.png`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Virtual Try-On</h1>
      <h2 className="text-xl font-semibold text-gray-600">Category: {clothingCategory}</h2>
      <div className="w-full h-[2px] bg-black mt-2 mb-6"></div> {/* Horizontal Black Line */}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Left Side: Image Preview */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg flex flex-col items-center shadow-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Preview</h2>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={600}
              height={800}
              className="border rounded-md shadow-lg"
            />
          </div>
        </div>

        {/* Right Side: Upload Section */}
        <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-2xl h-100 w-100 mt-30">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-20">Upload</h2>

          {!userImage ? (
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-32 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer hover:border-gray-400 transition"
            >
              <p className="text-gray-500">📷 Click to Upload</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-indigo-600 hover:to-blue-500 transition-all flex items-center gap-3 shadow-xl"
              >
                🔄 Change Photo
              </button>
          
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-red-500 transition-all flex items-center gap-3 shadow-xl"
              >
                ❌ Reset
              </button>

              <button
  onClick={handleDownload}
  className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-green-500 transition-all flex items-center gap-3 shadow-xl"
>
  ⬇️ Download Image
</button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Imageopt;