import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProdSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, totalPrice } = location.state || {}; // Get data from navigation

  if (!product) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">No product selected!</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Order Summary</h2>
        
        <div className="mt-4">
          <p className="text-lg"><strong>Product:</strong> {product.name}</p>
          <p className="text-lg"><strong>Price:</strong> ₹{product.price}</p>
          <p className="text-lg"><strong>Quantity:</strong> {quantity}</p>
          <hr className="my-4" />
          <p className="text-xl font-semibold"><strong>Total:</strong> ₹{totalPrice}</p>
        </div>

        <button
          onClick={() => navigate(`/buy/${product.id}`)}
          className="mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Confirm & Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default ProdSummary;
