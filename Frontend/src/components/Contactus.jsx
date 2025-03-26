import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contactus = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  //contact form main set krna data
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("contact", data);
        toast.success("Message Send successful!");
        setContact({
          username: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(
          response.data.extraDetails
            ? response.data.extraDetails.join(" ,")
            : response.data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mainContact flex justify-center flex-wrap gap-8 max-w-6xl mx-auto">
        {/* Contact Form Card */}
        <div className="bg-white flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
          <div className="left md:w-1/2">
            <img
              src={"/image/contact.jpg"}
              alt="contact image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="right p-8 md:w-1/2">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-signika mb-2 text-cyan-500">
                Get in Touch
              </h1>
              <p className="text-cyan-600 font-bold">
                Have questions or feedback? We would love to hear from you!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border-b-2 border-cyan-300 focus:border-cyan-500 outline-none transition"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border-b-2 border-cyan-300 focus:border-cyan-500 outline-none transition"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="What would you like to tell us?"
                  className="w-full px-4 py-2 rounded-lg border-b-2 border-cyan-300 focus:border-cyan-500 outline-none transition"
                  value={contact.message}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-700 text-white font-medium rounded-lg transition duration-200 mt-4"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full ">
          <div className="text-center mb-8 grid">
            <h1 className="text-3xl font-bold text-cyan-500 font-signika">
              Contact Information
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Address Box - Enhanced for large screens */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                </div>
                <h5 className="text-xl font-semibold text-gray-800 mb-2">
                  Our Address
                </h5>
                <p className="text-gray-600">123 Main Street</p>
                <p className="text-gray-600">City, Country 12345</p>
              </div>
            </div>
            {/* Email Box - Enhanced for large screens */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FaEnvelope className="text-blue-600 text-2xl" />
                </div>
                <h5 className="text-xl font-semibold text-gray-800 mb-2">
                  Email Us
                </h5>
                <p className="text-gray-600">support@example.com</p>
                <p className="text-gray-600">info@example.com</p>
              </div>
            </div>
            {/* Phone Box - Enhanced for large screens */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FaPhone className="text-blue-600 text-2xl" />
                </div>
                <h5 className="text-xl font-semibold text-gray-800 mb-2">
                  Call Us
                </h5>
                <p className="text-gray-600">+1 (123) 456-7890</p>
                <p className="text-gray-600">+1 (987) 654-3210</p>
              </div>
            </div>
          </div>
          {/* Business Hours - Enhanced for large screens */}
          <div className="mt-8 bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FaClock className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Business Hours
              </h3>
              <ul className="space-y-3 text-gray-600 w-full">
                <li className="flex justify-between px-4">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between px-4">
                  <span>Saturday & Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
