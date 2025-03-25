import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerImage from "../assets/register1.jpg";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

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

        toast.success("Registration successful!");
        setUser({ username: "", email: "", password: "" });
        console.log(responseData);
        navigate("/login");
      } else {
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails.join(" ,")
            : responseData.message
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-[90vw] md:max-w-[80vw] bg-white shadow-xl overflow-hidden rounded-4xl">
        <div
          className={
            "image-section w-full md:w-1/2  flex items-center justify-center transition-all duration-500"
          }
        >
          <img
            src={registerImage}
            alt="Auth Illustration"
            className="auth-image w-full h-full object-cover"
          />
        </div>

        <div className="form-section w-full md:w-1/2 p-10 flex flex-col justify-center transition-all duration-500">
          <h1 className="text-center text-5xl font-bold text-cyan-500 signika-negative">
            Register
          </h1>
          {/* Registration Form */}

          <form className="mt-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={user.username}
              onChange={handleInput}
              className="w-full px-2 py-2 border-b border-cyan-500 focus:border-cyan-700 focus:outline-none rounded-b-md bg-transparent mb-3.5"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={user.email}
              onChange={handleInput}
              className="w-full px-2 py-2 border-b border-cyan-500 focus:border-cyan-700 focus:outline-none rounded-b-md  bg-transparent mb-3.5"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-2 py-2 border-b border-cyan-500 focus:border-cyan-700 focus:outline-none rounded-b-md  bg-transparent mb-3.5"
              value={user.password}
              onChange={handleInput}
              required
            />

            <button
              type="submit"
              className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-md hover:opacity-90 mb-2"
            >
              Register
            </button>
            <Link to="/login">
              <p className="text-md text-right">Already have an account?</p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
