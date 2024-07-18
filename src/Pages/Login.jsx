import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import Navbar from '../components/Navbar';

function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    if (email === "" ){
      toast.error("Enter your email");
    }
    else if(password===""){
      toast.error("Enter password")
    }
    else if(role===""){
      toast.error("Enter Role");
    }
    else{

    
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/admin/login", {
        email,
        password,
        role
      }, { withCredentials: true });

      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/dash");
      console.log("Logged in User");
    } catch (err) {
      console.log("Problem logging User");
      console.log(err);
    }
  };
}

  if (isAuthenticated) {
    navigateTo("/dash");
  }

  return (
    <div>

    
    <div className="flex min-h-screen justify-center items-center bg-blue-200">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              <FaEnvelope className="inline-block text-gray-500 mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-gray-200 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              <FaLock className="inline-block text-gray-500 mr-2" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-gray-200 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              <AiOutlineUser className="inline-block text-gray-500 mr-2" />
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-gray-200 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">SELECT ROLE</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={loginUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <h4 className="mt-4 font-semibold text-center text-red-600">Don't have an account?</h4>
        <Link
          to="/register"
          className="block text-center font-bold text-red-600 hover:text-red-800"
        >
          Register
        </Link>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
