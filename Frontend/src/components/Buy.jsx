import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Buy = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // For navigation
  const [order, setOrder] = useState({
    name: "",
    mobile: "",
    address: "",
    payment: "PhonePe", // Default payment method
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await fetch(`http://localhost:3000/buy/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        setOrder({ name: "", mobile: "", address: "", payment: "PhonePe" });

        // Redirect to a success page or order summary
        navigate("/ordersuccess");
      } else {
        const responseData = await response.json();
        toast.error(responseData.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error, please try again");
    }
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Buy Product</h2>
          <p className="text-gray-600">Fill in the details to place your order</p>
        </div>

        <div className="flex justify-center">
          <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">Name</label>
                <input type="text" name="name" className="input input-bordered w-full" placeholder="Enter your name" value={order.name} onChange={handleInput} required />
              </div>

              <div className="form-control mt-4">
                <label className="label">Mobile</label>
                <input type="text" name="mobile" className="input input-bordered w-full" placeholder="Enter your mobile" value={order.mobile} onChange={handleInput} required />
              </div>

              <div className="form-control mt-4">
                <label className="label">Address</label>
                <input type="text" name="address" className="input input-bordered w-full" placeholder="Enter your address" value={order.address} onChange={handleInput} required />
              </div>

              <div className="form-control mt-4">
                <label className="label">Payment Method</label>
                <select name="payment" className="select select-bordered w-full" value={order.payment} onChange={handleInput} required>
                <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="PhonePe">PhonePe</option>

                </select>
              </div>

              <button className="btn bg-black text-white w-full mt-5 hover:bg-gray-800">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buy;
