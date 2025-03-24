import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import SubCategories from "./SubCategories";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const subcategoryParam = searchParams.get("subcategory");
  const categoryParam = searchParams.get("category");

  const categories = [
    { name: "Men's Fashion", img: "image/j6.jpg", category: "men" },
    { name: "Women's Fashion", img: "image/j7.jpg", category: "women" },
    { name: "Kid's Fashion", img: "image/j8.jpg", category: "kid" },
    { name: "Sports Fashion", img: "image/j9.jpg", category: "sport" },
  ];

  return (
    <div className="py-16 px-6 md:px-20">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        {subcategoryParam ? `Select Category for ${subcategoryParam}` : 
         categoryParam ? "Choose Subcategory" : "Explore Categories"}
      </h2>

      {!categoryParam ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={subcategoryParam 
                ? `/shop?category=${category.category}&subcategory=${subcategoryParam}`
                : `/categories?category=${category.category}`}
              className="no-underline"
            >
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                <div className="relative">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-96 sm:h-96 lg:h-[400px] xl:h-[450px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center flex flex-col justify-between h-full">
                  <h3 className="text-2xl font-semibold text-gray-800 transition-colors duration-300 hover:text-indigo-500">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {subcategoryParam ? `View ${category.category} ${subcategoryParam}` : "Click to explore"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <SubCategories currentCategory={categoryParam} />
      )}
    </div>
  );
};

export default Categories;