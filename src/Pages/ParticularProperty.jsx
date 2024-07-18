import React, { useState } from 'react'

import { Navigate } from 'react-router-dom';

const CreateProperty = () => {
    const [location,setLocation]=useState({});
    const [bedrooms,setBedrooms]=useState({});
    const [purpose,setPurpose]=useState({});
    const [parking,setParking]=useState({});
    const [gym,setGym]=useState({});
    const [furnish,setFurnish]=useState({});
    
    const[isAuthenticated,setAuthenticated]=useState(false);
    

    const updateProperty=async(e)=>{
        e.preventDefault();
        await axios.put("http://localhost:8000/api/v1/property/updateProperty",{
            location,purpose,gym,furnish,parking,bedrooms
        },{
            withCredentials:true
        })
        .then((res)=>{
            toast.success(res.data.message);
            console.log("property updated");
        })
        .catch((err)=>{
            toast.error(response.error.data.message);
        })
    };
    if(!isAuthenticated){
      <Navigate to="/home"/>
    }

    const deleteProperty=async(e)=>{
        e.preventDefault();
        await axios.delete("http://localhost:8000/api/v1/property/deleteProperty",{
            withCredentials:true
        })
        .then((res)=>{
            toast.success(res.data.message);
            console.log("property deleted");
        })
        .catch((err)=>{
            toast.error(response.error.data.message);
        })
    };
    

  return (
    <div>
      <div className="container form-component login-form">
        <h2>Update User Details</h2>
       
        <form>
          <input
            type="text"
            placeholder="location"
            value={location}
            onChange={(e)=> setLocation(e.target.value)}
          />
            <select value={furnish} onChange={(e) => setFurnish(e.target.value)}>
              <option value="">Furnish</option>
              <option value="furnished">Furnished</option>
              <option value="unFurnished">Un-Furnished</option>
              <option value="semiFurnished">Semi-Furnished</option>
            </select>
            <select value={gym} onChange={(e) => setGym(e.target.value)}>
              <option value="">Gym</option>
              <option value="Available">Available</option>
              <option value="UnAvailable">Not-Available</option>
            </select>
            <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
            </select>
            <select value={parking} onChange={(e) => setParking(e.target.value)}>
              <option value="UnAvailable">Not-Available</option>
              <option value="Available">Available</option>
            </select>
            <input
            type="text"
            placeholder="bedroom"
            value={bedrooms}
            onChange={(e)=> setBedrooms(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >

          </div>
          <Link to="/profile">
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button onClick={updateProperty} type="submit">Update Property</button>
          </div>
          </Link>
        </form>

        <p style={{ marginBottom: 0 }}>Want to go Back? </p>
            <Link
              to={"/profile"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Back
            </Link>
      </div>
    </div>
  )
}

export default CreateProperty
