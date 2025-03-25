import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Import useAuth

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateCartCount } = useAuth(); // Get updateCartCount from context

  const sizePriceMultiplier = {
    24: 1.0,
    26: 1.05,
    28: 1.1,
    30: 1.15,
    32: 1.2,
    34: 1.25
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/fashion/${id}`);

        if (response.status === 404) throw new Error("Product not found");
        if (!response.ok) throw new Error(`Failed to fetch (Status: ${response.status})`);

        const data = await response.json();

        if (!data.price || isNaN(parseFloat(data.price))) {
          throw new Error("Invalid product price");
        }

        setProduct({ ...data, price: parseFloat(data.price) });
        setError(null);
      } catch (error) {
        setError(error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleQuantityChange = (operation) => {
    setQuantity((prev) => Math.max(1, operation === "increment" ? prev + 1 : prev - 1));
  };

  const calculatePrice = () => {
    if (!product || !selectedSize) return product?.price || 0;
    const basePrice = product.price;
    const multiplier = sizePriceMultiplier[selectedSize] || 1;
    return (basePrice * multiplier * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: calculatePrice(),
      size: selectedSize,
      quantity,
    };
    

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count in global state
    updateCartCount(cart.length);

    navigate("/cart");
  };
  const handleTryOn = () => {
    if (!product?.imodel) return;
    navigate("/try_on", { 
      state: { 
        clothingImage: product.imodel,
        clothingCategory: product.subcategory 
      } 
    });
  };
  

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return (
    <div className="container mx-auto px-4 py-8 text-red-500">
      <p>Error: {error}</p>
      <a href="/shop" className="text-blue-600 hover:underline mt-4 block">
        Return to Shop
      </a>
    </div>
  );
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[600px] object-cover rounded-lg shadow-lg border"
            onError={(e) => (e.target.src = "/fallback-image.jpg")}
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="text-2xl font-semibold text-gray-800">
            ₹{calculatePrice()}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Select Size</h3>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 border rounded-lg text-center ${
                    selectedSize === size ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                  {sizePriceMultiplier[size] > 1 && (
                    <span className="block text-xs mt-1">
                      (+{(sizePriceMultiplier[size] - 1) * 100}%)
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="font-medium">Fabric:</p><p>{product.fabric}</p></div>
              <div><p className="font-medium">Pattern:</p><p>{product.pattern}</p></div>
              <div><p className="font-medium">Net Quantity:</p><p>{product.netQuantity}</p></div>
              <div><p className="font-medium">Sizes:</p><p>{product.sizes.join(", ")}</p></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 w-12"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-xl w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 w-12"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-4 rounded-lg w-full hover:bg-gray-800 disabled:opacity-50"
              disabled={!selectedSize}
            >
              {selectedSize ? `Add ${quantity} to Cart - ₹${calculatePrice()}` : "Select Size"}
            </button>
            <button
              onClick={handleTryOn}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg w-full hover:bg-dark"
            >
              Try On
            </button>
            <button
              onClick={() =>
                navigate("/prodsummary", {
                  state: {
                    product: {
                      id: product.id,  
                      name: product.name,
                      price: calculatePrice(),
                    },
                    quantity: quantity,
                    totalPrice: calculatePrice(),
                  },
                })
              }
              className="border-2 border-black px-8 py-4 rounded-lg w-full hover:bg-gray-50 disabled:opacity-50"
              disabled={!selectedSize}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;