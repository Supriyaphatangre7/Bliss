import { useState } from "react"; // Ensure this import is present
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../assets/login1.jpg";

const Login = () => {
  const [user, setUser] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:3000/login`, {
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

        // toast.success("Registration Successful");
        setUser({ email: "", password: "" });
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails.join(" ,")
            : responseData.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-[80vw] bg-white shadow-xl overflow-hidden rounded-4xl">
        <div className="form-section w-1/2 p-10 flex flex-col justify-center transition-all duration-500">
          <h1 className="text-center text-5xl font-bold text-cyan-500 signika-negative">
            Login
          </h1>

          {/* Login Form */}
          <form className="mt-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-2 py-2 border-b border-cyan-500 focus:border-cyan-700 focus:outline-none rounded-b-md bg-transparent mb-3.5"
              value={user.email}
              onChange={handleInput}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
              className="w-full px-2 py-2 border-b border-cyan-500 focus:border-cyan-700 focus:outline-none rounded-b-md bg-transparent mb-3.5"
              required
            />

            <button
              type="submit"
              className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-md hover:opacity-90 mb-2"
            >
              Login
            </button>
            <Link to="/register">
              <p className="text-md text-right">Don't have an account?</p>
            </Link>
          </form>
        </div>

        <div
          className={
            "image-section max-w-1/2 h-full flex items-center justify-center transition-all duration-500"
          }
        >
          <img
            src={loginImage}
            alt="Auth Illustration"
            className="auth-image w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
