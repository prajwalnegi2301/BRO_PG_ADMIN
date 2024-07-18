import axios from "axios";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBirthdayCake, FaVenusMars, FaUserTag } from 'react-icons/fa';

import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [role, setRole] = useState("");

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    if(name===""){
      toast.error("Please enter your name");
    }
    else if(email===""){
      toast.error("Please enter your email");
    }
    else if(password===""){
      toast.error("Please enter your password");
    }
    else if(phone==="" || phone.length < 10){
      toast.error("Please enter valid phone number");
    }
    else if(dob===""){
      toast.error("Please enter your date of birth");
    }
    else if(role===""){
      toast.error("Please select your role");
    }
    else if(gender===""){
      toast.error("Please select your gender");
    }
    else if(docAvatar===""){
      toast.error("Please upload your Image");
    }
    else{

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("dob", dob);
    formData.append("role", role);
    formData.append("docAvatar", docAvatar);
    formData.append("gender", gender);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/admin/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("User register successfully");
      setIsAuthenticated(true);
      navigateTo("/dash");
      setName("");
      setEmail("");
      setPhone("");
      setDob("");
      setGender("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error("Failed to register user");
    }
  };
}

  if (isAuthenticated) {
    navigateTo("/dash")
  }

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-blue-50">
      <ToastContainer position="top-center" />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleRegistration} className="space-y-6">
          <div className="flex justify-center">
            <img
              src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover bg-blue-100 text-sm rounded-full mb-4"
            />
          </div>
          <div className="flex justify-center">
            <input type="file" onChange={handleAvatar} className="text-gray-700" />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaBirthdayCake className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaVenusMars className="absolute left-3 top-3 text-gray-500" />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaUserTag className="absolute left-3 top-3 text-gray-500" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <p className="mb-0">Already Registered?</p>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
