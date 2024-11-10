// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4 hidden md:block">
      <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <NavLink to="add-participant" className="hover:bg-gray-700 p-2 rounded block">
              Add Participant
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="view-participants" className="hover:bg-gray-700 p-2 rounded block">
              View Participants
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="user-table" className="hover:bg-gray-700 p-2 rounded block">
              View users
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="live-view-leaderboard" className="hover:bg-gray-700 p-2 rounded block">
              View leaderboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="" className="hover:bg-gray-700 p-2 rounded block">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

// live-view-leaderboard