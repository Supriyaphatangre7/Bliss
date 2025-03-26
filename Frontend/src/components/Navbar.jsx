import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, cartCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4 sm:px-6 text-4xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            <li className="text-4xl">
              <Link to="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gray-700">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-700">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="text-3xl font-bold flex items-center gap-2"
          style={{ fontFamily: "Courgette" }}
        >
          Bliss <i className="fa-brands fa-bluesky"></i>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex text-4xl">
        <ul className="menu menu-horizontal px-1">
          <li className="text-xl">
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
          </li>
          <li className="text-xl">
            <Link to="/shop" className="hover:text-gray-700">
              Shop
            </Link>
          </li>
          <li className="text-xl">
            <Link to="/about" className="hover:text-gray-700">
              About
            </Link>
          </li>
          <li className="text-xl">
            <Link to="/contact" className="hover:text-gray-700">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side - Search, Cart and Profile */}
      <div className="navbar-end flex items-center gap-2 sm:gap-4">
        {/* Search Bar */}
        <div className="hidden sm:block relative w-48 lg:w-64">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <label className="input flex items-center gap-2 border-2 rounded-xl px-2 py-1">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Search products..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                aria-label="Search products"
              />
            </label>
          </form>
        </div>

        {/* Cart */}
        <div className="dropdown dropdown-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => navigate("/cart")}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:h-8 lg:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-red-500 text-white">
                {cartCount}
              </span>
            </div>
          </button>
        </div>

        {/* Profile */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full text-2xl border-2">
                {user?.username?.charAt(0).toUpperCase() || ":)"}{" "}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow"
            >
              <li className="dropdown-item disabled" style={{ color: "black" }}>
                <b>Welcome, {user?.username || "Guest"}</b>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 lg:w-14 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow"
            >
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="badge">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
