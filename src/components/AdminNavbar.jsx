import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaHome, FaUser, FaSignOutAlt, FaPlus, FaList } from "react-icons/fa";
import { Context } from "../main";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminNavbar = () => {
  const navigateTo = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/admin/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  });

  return (
    <nav className="bg-gray-500 shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dash" className="text-white text-2xl font-bold flex items-center">
              <FaHome className="mr-2" /> BRO PG
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/complaint" className="text-white text-lg font-semibold flex items-center">
              <FaList className="mr-1" /> Complaints
            </Link>
            <Link to="/profile" className="text-white text-lg font-semibold flex items-center">
              <FaUser className="mr-1" /> Listing
            </Link>
            <button
              onClick={handleLogout}
              className="text-white text-lg font-semibold flex items-center"
            >
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-white"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${open ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/complaint" className="text-white text-lg font-semibold block">
            <FaList className="mr-1" /> Complaints
          </Link>
          <Link to="/profile" className="text-white text-lg font-semibold block">
            <FaUser className="mr-1" /> Listing
          </Link>
          <button
            onClick={handleLogout}
            className="text-white text-lg font-semibold block"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
