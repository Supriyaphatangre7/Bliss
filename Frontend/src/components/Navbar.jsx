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
    <div className="navbar bg-base-100 sticky top-0 z-50 bg-white shadow-md px-4 sm:px-6">
      {/* Left Side */}
      <div className="flex-1 flex items-center gap-4">
        <Link to="/" className="btn btn-ghost text-3xl sm:text-4xl" style={{ fontFamily: "Courgette" }}>
          Bliss <i className="fa-brands fa-bluesky"></i>
        </Link>
        <ul className="menu menu-horizontal hidden md:flex items-center gap-4 text-xl">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Right Side - Search, Cart and Profile */}
      <div className="flex-none flex items-center gap-2 sm:gap-4">
        {/* Search Bar */}
        <div className="hidden sm:block relative w-48 lg:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full text-sm lg:text-lg px-3 lg:px-4 py-1 lg:py-2 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 lg:px-4 py-0.5 lg:py-1 rounded-full hover:bg-gray-700 text-sm lg:text-base"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Cart */}
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle" onClick={() => navigate("/cart")}>
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item bg-red-500 text-white">{cartCount}</span>
            </div>
          </button>
        </div>

        {/* Profile */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-14 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow">
              <li className="dropdown-item disabled" style={{ color: "black" }}>
                <b>Welcome, {user?.username || "Guest"}</b>
              </li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-14 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="badge">Register</Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;