import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAuth } from "../store/auth";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contactus = () => {

  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  //contact form main set krna data
  const[userData,setUserData]=useState(true);
  const {user}=useAuth();

  if(userData && user)
  {
    setContact({
      username:user.username,
      email:user.email,
      message:"",
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

  const handleSubmit =async (e) => {
    e.preventDefault();

    try 
    {
       
      const response=await fetch("http://localhost:3000/contact",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(contact)
      });

       if(response.ok)
       {
         const data=await response.json();
         console.log("contact",data);
         toast.success('Message Send successful!');
        setContact({
          username:"",
          email:"",
          message:"",
        });
       }else{
               toast.error(responseData.extraDetails?responseData.extraDetails.join(" ,"):responseData.message);
             }

    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-600">We would love to hear from you!</p>
        </div>

        {/* Form Section */}
        <div className="flex justify-center">
          <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input type="text"  name="username" placeholder="Enter your full name" className="input input-bordered w-full" value={contact.username} onChange={handleInput} required />
              </div>
              
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input type="email"  name="email" placeholder="Enter your email" className="input input-bordered w-full"   value={contact.email}
                      onChange={handleInput}required />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input type="text"  name="message" placeholder="Enter subject" className="input input-bordered w-full" value={contact.message}
                      onChange={handleInput} required />
              </div>

              <button className="btn bg-black text-white w-full mt-5 hover:bg-gray-800">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10">
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-gray-700 mb-2" />
            <h5 className="text-lg font-semibold">Our Address</h5>
            <p className="text-gray-600">123 Main Street, City, Country</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-3xl text-gray-700 mb-2" />
            <h5 className="text-lg font-semibold">Email</h5>
            <p className="text-gray-600">support@example.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPhone className="text-3xl text-gray-700 mb-2" />
            <h5 className="text-lg font-semibold">Phone</h5>
            <p className="text-gray-600">+123 456 7890</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
