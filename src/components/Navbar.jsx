import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {

  const { isAuthenticated, setIsAuthenticated } =
  useContext(Context);
  const navigateTo = useNavigate();

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
  
  useEffect(()=>{
    if (!isAuthenticated) {
      navigateTo("/");
    }
  })

  return (
    <nav className="bg-gradient-to-r from-[#4A7682] via-[#8AAFBA] to-[#4A7682] py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/dash" className="text-white text-2xl font-bold flex items-center">
          BRO PG
        </Link>
        <div className="space-x-4 flex mx-1 items-center">
          <Link to="/profile" className="text-white text-lg flex items-center">
            <FaUser className="mr-1" /> Profile
          </Link>
          <Link to="/complaint" className="text-white text-lg flex items-center">
            <FaUser className="mr-1" /> Complaints
          </Link>
          
          {isAuthenticated ? (<button
            onClick={handleLogout}
            className="text-white text-lg mx-1 flex items-center"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>) : (<button
                className="text-yellow-400 text-lg font-semibold"
                
              >
                LOGIN
              </button>)}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
