// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation without full page reloads
import { FaUserPlus, FaSignInAlt, FaChartLine } from 'react-icons/fa'; // Importing icons

const Navbar = () => {
  return (
    <nav className="bg-blue-400 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">iVote</h1>
        <div className="flex items-center">
          {/* <Link to="/leaderboard" className="text-white hover:underline mx-4 flex items-center">
            <FaChartLine className="mr-1" /> Leaderboard
          </Link> */}
          <Link to="/register" className="text-white hover:underline mx-4 flex items-center">
            <FaUserPlus className="mr-1" /> Register
          </Link>
          <Link to="/login" className="text-white hover:underline flex items-center">
            <FaSignInAlt className="mr-1" /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
