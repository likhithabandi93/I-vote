// src/components/VotingNavbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const VotingNavbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Vote App
        </div>
        <div className="space-x-4">
          {/* <Link to="/" className="text-white hover:text-blue-300">Home</Link> */}
          {/* <Link to="/vote" className="text-white hover:text-blue-300">Vote</Link>
          <Link to="/results" className="text-white hover:text-blue-300">Results</Link>
          <Link to="/logout" className="text-white hover:text-blue-300">Logout</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default VotingNavbar;
