import React from "react";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

const ItemHome = () => {
  // Example Product Data
  const item = {
    id: 1,
    name: "Denim Jacket",
    image: "/image/djacket.jpeg",
    price: "₹450",
    category: "Jackets",
    rating: 4.5,
    reviews: 120,
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 w-80">
        {/* Product Image */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 object-cover rounded-lg"
          />
          <span className="absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-lg bg-green-500 text-white">
            In Stock
          </span>
        </div>

        {/* Product Details */}
        <div className="mt-3">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500 text-sm">{item.category}</p>

          {/* Ratings */}
          <div className="flex items-center text-yellow-400 mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="fill-current" />
            ))}
            <span className="ml-2 text-gray-600">({item.reviews} reviews)</span>
          </div>

          {/* Price & Try-On Button */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-xl font-bold text-gray-900">{item.price}</span>
            <button className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800 transition">
              Try on Avatar
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-3">
            <button className="btn bg-gray-800 text-white flex items-center px-4 py-2 rounded-lg hover:bg-gray-900">
              <FaShoppingCart className="mr-2" /> Shop Now
            </button>
            <button className="text-gray-600 hover:text-red-500 transition">
              <FaHeart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemHome;
