import React from "react";
import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from 'react-countup';
import Eyes from "../components/Eyes";
import { useContext } from "react";
import { Context } from "../main";
import AdminNavbar from "../components/AdminNavbar";


const Dashboard= () => {
  const navigateTo = useNavigate();
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  if(!isAuthenticated){
    navigateTo("/");
  }


  const CategoryCard = ({ title, image }) => (
    <motion.div
      className="w-full max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-2"
      whileHover={{ scale: 1.1 }}
    >
      <img className="w-full h-32 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </motion.div>
  );



  const StatCard = ({ number, label }) => {
    return (
      <div className="text-center">
        <CountUp end={parseInt(number.replace(/\D/g, ''))} duration={3} separator="," />
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    );
  };

  return (
    <div className="bg-red-50">
      <AdminNavbar/>
      {/* <MouseTracker/> */}
      <div className="min-h-screen flex flex-col items-center justify-center py-16 px-16">
        <motion.div
          className="bg-white shadow-md rounded-lg overflow-hidden w-full px-2 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 flex flex-col md:flex-row items-center">
            <div className="flex-1 md:mr-6">
              <h1 className="text-5xl font-bold mb-1">Welcome to</h1>
              <AnimatedText />
              <h1 className="text-4xl font-bold text-gray-800">
                Spend less time Travelling and commit more hours to Work.
              </h1>
              <p className="mt-4 text-gray-600">
                Live close to College, Coaching Institute or your Office
              </p>
              
            </div>
            <div className="flex-shrink-0 mt-6 md:mt-0">
              <img
                className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnnzte7_Hoq5Wo8pgn0E7Q0vZ-82hQ7MhEQ&s"
                alt="student"
              />
            </div>
          </div>
          <div className="p-6 rounded-lg mb-4 bg-slate-100 flex flex-col md:flex-row justify-around items-center">
            <CategoryCard
              title="Modern Housing"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Kq1Slq7f5-kEqN6L3YNRayVCA21KgZ4yTw&s"
            />
            <CategoryCard
              title="Indoor Games"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhtBnCmGP9hDhNmIhZIpvrs-RFdQjl_diJQ&s"
            />
            <CategoryCard
              title="Quality Food"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8oZpl8O9-cPPcDNftSc6gvg47Ve5BqDBP9A&s"
            />
          </div>
        </motion.div>
        <div className="flex mt-20 font-bold text-2xl space-x-10 text-red-600">
          
          <StatCard number="2000+" label="Students Trust" />
          <StatCard number="1000+" label="Beds"  />
          <StatCard number="10+" label="Locations" />
        </div>
      </div>
      <div className="min-h-screen mt-12 flex flex-col items-center justify-center mx-16 p-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Not just <span className="text-red-500">Wall of Bricks</span>
          </h2>
          <p className="mt-2 mb-24 text-gray-600">
            Come over and experience how a place can be so much more...
          </p>
          <div className="flex mb-24">
            <div className="flex md:flex-row justify-center items-center gap-2 space-y-6 md:space-y-0 md:space-x-4 mb-10">
              <motion.img
                className="w-72 h-96 object-cover rounded-lg shadow-md"
                src="https://hips.hearstapps.com/hmg-prod/images/ghk090123homefeature-005-655b97aee4cbc.jpg?crop=0.828xw:1.00xh;0,0&resize=980:*"
                alt="Buildings"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex flex-col">
                <motion.img
                  className="w-72 mb-1 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcwIyg5jYDkNLmRn6i1-n11cMDH5f1J83k6w&s"
                  alt="Rooms"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img
                  className="w-72 mt-1 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHueel2zkH6Yxmqr23v8eq9yB1KhPgcYDdPg&s"
                  alt="Living Room"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </div>
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl mt-32 font-bold text-gray-800">
                Begin your next phase of Journey from{" "}
                <span className="text-red-500">Day 1</span>
              </h3>
              <p className="mt-6 px-4 text-gray-600">
                Pack bag with your dreams and ambitions... Everything else like
                furniture, appliances, and games will be provided here.
              </p>
            </div>
          </div>
          <div className="flex mb-24">
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl pr-8 gap-2 mt-32 font-bold text-gray-800">
                Step into rooms that has{" "}
                <span className="text-red-500">space for everything</span>
              </h3>
              <p className="mt-6 px-4 text-gray-600">
                Your accessories will not be adjusting with each other on same
                table. Pg has there's space for everything.
              </p>
            </div>
            <div className="flex md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mb-10">
              <motion.img
                className="w-72 h-96 object-cover rounded-lg shadow-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOumUJmIlx7RNER4ZBkD46MiKNhillHagBA&s"
                alt="Rooms"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex flex-col">
                <motion.img
                  className="w-72 mb-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0EMBGHEOcdjeenMD1G33u76oNZVCEGuK_sw&s"
                  alt="Spacious Rooms"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img
                  className="w-72 mt-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSYBV_hRgxqLNhzdHJ3AmZjRueYRAMglmmA&s"
                  alt="Bedroom"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </div>
            
          </div>
          
          <div className="flex mb-24">
            <div className="flex md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mb-10">
              <motion.img
                className="w-72 h-96 object-cover rounded-lg shadow-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcVrrvymskCztZFN0sqt2LByM90wlVPoXmAA&s"
                alt="Washroom"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex flex-col">
                <motion.img
                  className="w-72 mb-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCkM684hqOSb6W-LeAjvoEM23CcEA6DOirzQ&s"
                  alt="Bathroom"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img
                  className="w-72 mt-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLa2A666udVYtB4UApVUvKUQS7JdCmBEtQg&s"
                  alt="Basin"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </div>
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl mt-32 font-bold text-gray-800">
                Don't worry about your{" "}
                <span className="text-red-500">Daily Chores</span>
              </h3>
              <p className="mt-6 px-4 text-gray-600">
                The Pg has a no. of washroom on each floor that you do not have
                to wait for your turn. You also don't have to worry about food,
                Bro Pg has already taken care of that.
              </p>
            </div>
          </div>
          <div className="flex mb-24">
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl mt-32 font-bold text-gray-800">
                Play Games with your new Family{" "}
                <span className="text-red-500">in large Common Area</span>
              </h3>
              <p className="mt-6 px-4 text-gray-600">
                We'have sofas, tv in the common area and games like-carrom,
                billiard, etc to play. Also cleaning service does its work twice
                a day for you.
              </p>
            </div>
            <div className="flex md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mb-10">
              <motion.img
                className="w-72 h-96 object-cover rounded-lg shadow-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrsVLLT3AzMKjZoEkDUZrZevodBbPoXp6paA&s"
                alt="Common Area"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex flex-col">
                <motion.img
                  className="w-72 mb-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagQyScm9YXeqUQpE3K-nteuvPRwaU8S3Z0g&s"
                  alt="Hall"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img
                  className="w-72 mt-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKFhhU_q0FGp-wbDQiKUI1cVOXQa5SH3xfjQ&s"
                  alt="Gym"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </div>
          </div>
          <div className="flex mb-24">
            <div className="flex md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mb-10">
              <motion.img
                className="w-72 h-96 object-cover rounded-lg shadow-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN4bUBGTJhJVHehtsR30g_iVxLKM5IXsdUiQ&s"
                alt="Table"
                whileHover={{ scale: 1.1 }}
              />
              <div className="flex flex-col">
                <motion.img
                  className="w-72 mb-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1qKfi7Zmg42tfa4ucIyHITGaOccqlR5dEug&s"
                  alt="Almirah"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.img
                  className="w-72 mt-2 h-48 object-cover rounded-lg shadow-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGtKGIoKsXVcKxstEARiJK1Q9DZ6aox-EsRg&s"
                  alt="Chair"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
            </div>
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl mt-32 font-bold text-gray-800">
                Don't worry about Basic needs from{" "}
                <span className="text-red-500">Day 1</span>
              </h3>
              <p className="mt-6 px-4 text-gray-600">
                We provide you with all the necessary amenities to make your
                stay comfortable and convenient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
