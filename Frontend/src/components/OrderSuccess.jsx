import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Import success icon

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" /> {/* Success Icon */}
        <h2 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order will be delivered soon.</p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
