// src/components/AdminPanel.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaUserPlus,
  FaUsers,
  FaTable,
  FaTrophy,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";

import { useState } from 'react';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigationLinks = [
    {
      name: 'dashboard',
      path: 'dashboard',
      icon: <RxDashboard />,
    },
    {
      name: 'Add Participant',
      path: 'add-participant',
      icon: <FaUserPlus />,
    },
    {
      name: 'View Participants',
      path: 'view-participants',
      icon: <FaUsers />,
    },
    {
      name: 'View Voters',
      path: 'user-table',
      icon: <FaTable />,
    },
    {
      name: 'View Leaderboard',
      path: 'live-view-leaderboard',
      icon: <FaTrophy />,
    },
    {
      name: 'Logout',
      path: '/',
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64  bg-gradient-to-br from-teal-200 via-sky-300 to-indigo-700 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 bg-gradient-to-br from-teal-200 via-sky-300 to-indigo-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-10">
          <ul>
            {navigationLinks.map((link) => (
              <li key={link.name} className="mb-2">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 hover:bg-gray-700 transition-colors ${
                      isActive ? 'bg-blue-900' : ''
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="ml-3">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-gradient-to-r from-teal-200 via-sky-300 to-indigo-700 text-white px-4 py-3 shadow-md">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="text-white focus:outline-none md:hidden"
              onClick={toggleSidebar}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold ml-2">Dashboard</h2>
          </div>
          <div className="flex items-center">
            {/* User Profile / Actions */}
            <div className="flex items-center space-x-4">
              <span className="hidden md:block">Welcome, Admin</span>
              <button className="focus:outline-none">
                {/* Placeholder for user profile icon */}
                <FaUserPlus className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-auto bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};  

export default AdminPanel;
