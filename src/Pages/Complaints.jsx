// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../main";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   FaUserCircle,
//   FaClipboardList,
//   FaTools,
//   FaUser,
//   FaCalendarAlt,
//   FaClipboardCheck,
// } from "react-icons/fa";
// import AdminNavbar from "../components/AdminNavbar";

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const [connectMessages, setConnectMessages] = useState([]);
//   const { isAuthenticated } = useContext(Context);
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigateTo("/");
//     }
//   }, [isAuthenticated, navigateTo]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/v1/user/getAllMessages",
//           { withCredentials: true }
//         );
//         console.log("Fetched messages:", response.data.messages); // Debugging log
//         setMessages(response.data.messages || []); // Ensure it sets an empty array if messages is undefined
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         setMessages([]);
//       }
//     };
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     const fetchConnectMessages = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/v1/connect/getConnectMessages",
//           { withCredentials: true }
//         );
//         console.log("Fetched messages:", response.data.connectMessages); // Debugging log
//         setConnectMessages(response.data.connectMessages || []); // Ensure it sets an empty array if messages is undefined
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         setConnectMessages([]);
//       }
//     };
//     fetchConnectMessages();
//   }, []);

//   const handleUpdateStatus = async (messageId, status) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/v1/user/updateContactUs/${messageId}`,
//         { status },
//         { withCredentials: true }
//       );
//       setMessages((prevMessages) =>
//         prevMessages.map((message) =>
//           message._id === messageId ? { ...message, status } : message
//         )
//       );
//       toast.success(response.data.message);
//     } catch (error) {
//       console.error("Error updating message status:", error);
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   };

//   const [pendingStatus, setPendingStatus] = useState(0);
//   const [acceptedStatus, setAcceptedStatus] = useState(0);
//   const [rejectedStatus, setRejectedStatus] = useState(0);

//   useEffect(() => {
//     let countP = 0;
//     let countA = 0;
//     let countR = 0;

//     messages.forEach((message) => {
//       if (message.status === "Pending") {
//         countP++;
//       } else if (message.status === "Accepted") {
//         countA++;
//       } else if (message.status === "Rejected") {
//         countR++;
//       }
//     });

//     setPendingStatus(countP);
//     setAcceptedStatus(countA);
//     setRejectedStatus(countR);
//   }, [messages]);

//   return (
//     <>
//       <AdminNavbar />
//       <section className="p-6 min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
//         <div className="flex flex-col md:flex-row gap-6 mb-6">
//           <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNN58XFDLxdqtwwWRSE924NjtuSryXFGxjg&s"
//               alt=""
//               className="w-16 h-16 rounded-full shadow-xl mr-4"
//             />
//             <div className="content">
//               <div>
//                 <p className="text-gray-700 font-semibold">Hello ,</p>
//                 <h5 className="text-2xl font-bold text-blue-600">
//                   Mr.Sachin Singh
//                 </h5>
//               </div>
//               <h4 className="text-gray-700 font-semibold mt-2">
//                 Hope you're having a great day! Just wanted to express
//                 appreciation for everything you do at BRO PG. Your hard work and
//                 dedication is truly making a difference.
//               </h4>
//               <h4 className="text-gray-700 font-semibold">
//                 Wishing you a wonderful day ahead!
//               </h4>
//             </div>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6 text-center">
//             <FaClipboardList className="w-10 h-10 text-blue-600 mx-auto" />
//             <p className="text-gray-700">Total messages</p>
//             <h3 className="text-xl mb-1 font-semibold text-yellow-400">
//               Pending messages: {pendingStatus}
//             </h3>
//             <h3 className="text-xl mb-1 font-semibold text-green-600">
//               Accepted messages: {acceptedStatus}
//             </h3>
//             <h3 className="text-xl font-semibold text-red-600">
//               Rejected messages: {rejectedStatus}
//             </h3>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6 text-center">
//             <FaTools className="w-10 h-10 text-blue-600 mx-auto" />
//             <p className="text-gray-700">Registered Workers</p>
//             <h3 className="text-2xl font-bold text-blue-600">10</h3>
//           </div>
//         </div>
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h5 className="text-xl font-semibold mb-4 text-blue-600 flex items-center">
//             <FaClipboardCheck className="mr-2" /> messages
//           </h5>
//           <div className="overflow-x-auto">
//             <div className="grid grid-cols-6 gap-4 bg-gray-200 p-2 rounded-md text-gray-700">
//               <div className="flex items-center">
//                 <FaUser className="mr-1" /> Student
//               </div>
//               <div className="flex items-center">
//                 <FaCalendarAlt className="mr-1" /> message
//               </div>
//               <div className="flex items-center">
//                 <FaUser className="mr-1" /> Status
//               </div>
//             </div>
//             <div className="mt-4">
//               {messages.length > 0 ? (
//                 messages.map((message) => (
//                   <div
//                     key={message._id}
//                     className="grid grid-cols-6 gap-4 p-2 border-b border-gray-300"
//                   >
//                     <div>{message.name}</div>
//                     <div>{message.message}</div>
//                     <div>{message.status}</div>
//                     <div>
//                       <select
//                         className={`${
//                           message.status === "Pending"
//                             ? "bg-yellow-200 text-yellow-800"
//                             : message.status === "Accepted"
//                             ? "bg-green-200 text-green-800"
//                             : "bg-red-200 text-red-800"
//                         } p-2 rounded-md`}
//                         value={message.status}
//                         onChange={(e) =>
//                           handleUpdateStatus(message._id, e.target.value)
//                         }
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Accepted">Accepted</option>
//                         <option value="Rejected">Rejected</option>
//                       </select>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center text-gray-700 mt-4">
//                   No messages Found!
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <h1>Visitors Message</h1>
//         <div className="mt-4">
//               {connectMessages.length > 0 ? (
//                 connectMessages.map((message) => (
//                   <div
//                     key={message._id}
//                     className="grid grid-cols-6 gap-4 p-2 border-b border-gray-300"
//                   >
//                     <div>{message.name}</div>
//                     <div>{message.message}</div>

//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center text-gray-700 mt-4">
//                   No messages Found!
//                 </div>
//               )}
//             </div>

//       </section>
//     </>
//   );
// };

// export default Messages;

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUserAlt,
  FaClipboardList,
  FaTools,
  FaUser,
  FaCalendarAlt,
  FaClipboardCheck,
} from "react-icons/fa";
import AdminNavbar from "../components/AdminNavbar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [connectMessages, setConnectMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/getAllMessages",
          { withCredentials: true }
        );
        console.log("Fetched messages:", response.data.messages); // Debugging log
        setMessages(response.data.messages || []); // Ensure it sets an empty array if messages is undefined
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchConnectMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/connect/getConnectMessages",
          { withCredentials: true }
        );
        console.log("Fetched connect messages:", response.data.connectMessages); // Debugging log
        setConnectMessages(response.data.connectMessages || []); // Ensure it sets an empty array if messages is undefined
      } catch (error) {
        console.error("Error fetching connect messages:", error);
        setConnectMessages([]);
      }
    };
    fetchConnectMessages();
  }, []);

  const handleUpdateStatus = async (messageId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/user/updateContactUs/${messageId}`,
        { status },
        { withCredentials: true }
      );
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === messageId ? { ...message, status } : message
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const [pendingStatus, setPendingStatus] = useState(0);
  const [acceptedStatus, setAcceptedStatus] = useState(0);
  const [rejectedStatus, setRejectedStatus] = useState(0);

  useEffect(() => {
    let countP = 0;
    let countA = 0;
    let countR = 0;

    messages.forEach((message) => {
      if (message.status === "Pending") {
        countP++;
      } else if (message.status === "Accepted") {
        countA++;
      } else if (message.status === "Rejected") {
        countR++;
      }
    });

    setPendingStatus(countP);
    setAcceptedStatus(countA);
    setRejectedStatus(countR);
  }, [messages]);

  return (
    <>
      <AdminNavbar />
      <section className="p-6 min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNN58XFDLxdqtwwWRSE924NjtuSryXFGxjg&s"
              alt=""
              className="w-16 h-16 rounded-full shadow-xl mr-4"
            />
            <div className="content">
              <div>
                <p className="text-gray-700 font-semibold">Hello ,</p>
                <h5 className="text-2xl font-bold text-blue-600">
                  Mr.Sachin Singh
                </h5>
              </div>
              <h4 className="text-gray-700 font-semibold mt-2">
                Hope you're having a great day! Just wanted to express
                appreciation for everything you do at BRO PG. Your hard work and
                dedication is truly making a difference.
              </h4>
              <h4 className="text-gray-700 font-semibold">
                Wishing you a wonderful day ahead!
              </h4>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaClipboardList className="w-10 h-10 text-blue-600 mx-auto" />
            <p className="text-gray-700">Total messages</p>
            <h3 className="text-xl mb-1 font-semibold text-yellow-400">
              Pending messages: {pendingStatus}
            </h3>
            <h3 className="text-xl mb-1 font-semibold text-green-600">
              Accepted messages: {acceptedStatus}
            </h3>
            <h3 className="text-xl font-semibold text-red-600">
              Rejected messages: {rejectedStatus}
            </h3>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaTools className="w-10 h-10 text-blue-600 mx-auto" />
            <p className="text-gray-700">Registered Workers</p>
            <h3 className="text-2xl font-bold text-blue-600">10</h3>
          </div>
        </div>
        {/* <div className="bg-white shadow-md rounded-lg p-6"> */}
          {/* <h5 className="text-xl font-semibold mb-4 text-blue-600 flex items-center">
            <FaClipboardCheck className="mr-2" /> messages
          </h5>


          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-4 bg-gray-200 p-2 rounded-md text-gray-700">
              <div className="flex items-center">
                <FaUser className="mr-1" /> Student
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" /> message
              </div>
              <div className="flex items-center">
                <FaUser className="mr-1" /> Status
              </div>
            </div> */}

          {/* <div className="mt-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message._id}
                    className="grid grid-cols-6 gap-4 p-2 border-b border-gray-300"
                  >
                    <div>{message.name}</div>
                    <div>{message.message}</div>
                    <div>{message.status}</div>
                    <div>
                      <select
                        className={`${
                          message.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : message.status === "Accepted"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        } p-2 rounded-md`}
                        value={message.status}
                        onChange={(e) =>
                          handleUpdateStatus(message._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-700 mt-4">
                  No messages Found!
                </div>
              )}
            </div> */}

          {/* <div className="p-6 bg-white rounded-lg shadow-md"> */}
            {/* <h1 className="text-2xl font-bold mb-4">Visitors Message</h1>
      <div className="mt-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300 items-center"
            >
              <div className="col-span-1 flex justify-center">
                <FaUserAlt className="text-gray-600 text-xl" />
              </div>
              <div className="col-span-2 text-gray-800 font-semibold">
                {message.name}
              </div>
              <div className="col-span-2 text-gray-600">
                {message.message}
              </div>
              <div className="col-span-1 text-gray-600">
                {message.status}
              </div>
              <div className="col-span-1">
                <select
                  className={`${
                    message.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : message.status === "Accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  } p-2 rounded-md w-full`}
                  value={message.status}
                  onChange={(e) =>
                    handleUpdateStatus(message._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-700 mt-4">
            No messages Found!
          </div>
        )}
      </div> */}
          {/* </div> */}
        {/* </div> */}
        <div className="p-6  bg-white rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-4 text-blue-600 flex items-center">
            <FaClipboardCheck className="mr-2" /> Messages
          </h5>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-4 bg-gray-200 p-2 rounded-md text-gray-700">
              <div className="flex items-center col-span-2">
                <FaUser className="mr-1" /> Student
              </div>
              <div className="flex items-center col-span-2">
                <FaCalendarAlt className="mr-1" /> Message
              </div>
              <div className="flex items-center col-span-2">
                <FaUser className="mr-1" /> Status
              </div>
            </div>
            {messages.length > 0 ? (
              messages.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300 items-center"
                >
                  <div className="col-span-2 text-gray-800 font-semibold flex items-center">
                    <FaUser className="mr-1" /> {message.name}
                  </div>
                  <div className="col-span-2 text-gray-600 flex items-center">
                    <FaCalendarAlt className="mr-1" /> {message.message}
                  </div>
                  <div className="col-span-1 text-gray-600">
                    {message.status}
                  </div>
                  <div className="col-span-1">
                    <select
                      className={`${
                        message.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : message.status === "Accepted"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      } p-2 rounded-md w-full`}
                      value={message.status}
                      onChange={(e) =>
                        handleUpdateStatus(message._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-700 mt-4">
                No messages Found!
              </div>
            )}
          </div>
        </div>

        {/* </div> */}
        {/* <h1>Visitors Message</h1>
        <div className="mt-4 ">
          {connectMessages.length > 0 ? (
            connectMessages.map((message) => (
              <div
                key={message._id}
                className="grid grid-cols-6 gap-4 p-2 border-b border-gray-300"
              >
                <div>{message.name}</div>
                <div>{message.message}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-700 mt-4">
              No messages Found!
            </div>
          )}
        </div> */}

        <div className="p-6 mt-16 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Visitors Message</h1>
          <div className="mt-4">
            {connectMessages.length > 0 ? (
              connectMessages.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300 items-center"
                >
                  <div className="col-span-1 flex justify-center">
                    <FaUserAlt className="text-gray-600 text-xl" />
                  </div>
                  <div className="col-span-2 text-gray-800 font-semibold">
                    {message.name}
                  </div>
                  <div className="col-span-3 text-gray-600">
                    {message.message}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-700 mt-4">
                No messages Found!
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Messages;
