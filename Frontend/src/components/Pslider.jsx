import React from "react";
import { Link } from "react-router-dom";

function Pslider() {
  const subCategories = [
    { name: "T-shirts", img: "image/s3.jpg", subcategory: "tshirt" },
    { name: "Tops", img: "image/s1.jpg", subcategory: "top" },
    { name: "Bottoms", img: "image/s2.jpg", subcategory: "bottom" },
    { name: "Outerwear", img: "image/s4.jpg", subcategory: "outwear" },
    { name: "Innerwear", img: "image/s5.jpg", subcategory: "innerwear" },
    { name: "Shorts", img: "image/s6.jpg", subcategory: "short" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-[90%] overflow-hidden">
        <div className="flex space-x-6 p-6 overflow-x-auto scroll-smooth">
          {subCategories.map((sub, index) => (
            <div 
              key={index}
              className="carousel-item w-[350px] h-[500px] relative flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={sub.img}
                alt={sub.name}
                className="rounded-lg w-full h-full object-cover"
              />
              <Link 
                to={`/categories?subcategory=${sub.subcategory}`}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              >
                <button className="bg-white bg-opacity-70 text-black px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-black hover:text-white hover:scale-110">
                  {sub.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pslider;