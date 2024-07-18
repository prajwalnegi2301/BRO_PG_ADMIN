import { useState } from 'react'
import { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'

import ParticularProperty from './Pages/ParticularProperty'
import Profile from './Pages/Profile'
import UpdateProfile from './Pages/UpdateProfile'
import { useContext } from 'react';
import { Context } from './main';
import axios from 'axios';
import Complaints from './Pages/Complaints'

const App=()=> {
  const {isAuthenticated,setIsAuthenticated, properties, setProperties, user, setUser} = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/admin/getAdmin",
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/property/getAllProperties",
          { withCredentials: true }
        );
        setProperties(data.properties);
      } catch (error) {
        setProperties([]);
      }
    };
    fetchUser();
    fetchProperty()
  }, [isAuthenticated]);
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/dash" element={<Dashboard/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
     
      {/* <Route path="/particularProperty" element={<ParticularProperty/>}/> */}
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/complaint" element={<Complaints/>}/>
      {/* <Route path="/updateProfile" element={<UpdateProfile/>}/> */}


    </Routes>
      
    </BrowserRouter>
  )
}

export default App
