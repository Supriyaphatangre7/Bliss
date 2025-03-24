import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth"; // Import useAuth

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { updateCartCount } = useAuth(); // Get updateCartCount from context

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Calculate total price
  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  // Handle delete item from cart
  const handleDeleteItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Remove the item at the specified index
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    calculateTotal(updatedCart); // Recalculate total

    // Update cart count in global state
    updateCartCount(updatedCart.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center gap-6 border p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg border" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
                <p className="text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                <p className="text-gray-800 font-semibold">Price: ₹{item.price}</p>
              </div>
              <button
  onClick={() => handleDeleteItem(index)}
  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
>
  Delete
</button>

            </div>
          ))}
          <div className="text-2xl font-bold text-right mt-6 border-t pt-4">
            Total: ₹{total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;