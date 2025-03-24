import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const {storeTokenInLs}=useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const responseData = await response.json();
      console.log("response data : ", responseData);

      if (response.ok) {
        storeTokenInLs(responseData.token);
       
        toast.success('Registration successful!');
        setUser({ username: "", email: "", password: "" });
        console.log(responseData);
        navigate("/login")
      } else{
        toast.error(responseData.extraDetails?responseData.extraDetails.join(" ,"):responseData.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-3xl bg-white shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold">Register</h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Registration Form */}
          <div className="w-full lg:w-1/2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={user.username}
                  onChange={handleInput}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={user.email}
                  onChange={handleInput}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  value={user.password}
                  onChange={handleInput}
                  required
                />
              </div>

              <button className="btn bg-black text-white w-full hover:bg-gray-900">
                Register
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-gray-300 h-40"></div>
          <div className="lg:hidden w-full border-t border-gray-300"></div>

          {/* Login Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h6 className="text-xl font-semibold">Already have an account?</h6>
            <p className="text-gray-500 mt-2">
              Log in now to access your account and enjoy exclusive features!
            </p>
            <Link to="/login">
              <button className="btn bg-black text-white w-full lg:w-auto hover:bg-gray-900">
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
