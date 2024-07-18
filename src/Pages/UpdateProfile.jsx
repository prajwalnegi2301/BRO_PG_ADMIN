import React, { useContext, useState } from 'react'
import { Link, Navigate  } from 'react-router-dom';

const UserProfile = () => {
    const[isAdminAuthenticated,setIsAdminAuthenticated] = useContext(context);
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const[dob,setDob] = useState("");

  

    const updateUserDetails = async()=>{

        await axios.put("http://localhost:8000/api/v1/user/updateUser",{
          name,email,phone,gender,dob
        },{
          withCredentials:true
        })
        .then((res)=>{
          toast.success(res.data.message);
          console.log("user details updated");
          
          
        })
        .catch((err)=>{
          toast.error(response.error.data.message);
        })
      }

      const deleteUser = async(id)=>{
        e.preventDefault();
        axios.delete("http://localhost/8000/api/v1/user/deleteUser",{
            withCredentials:true,
        })
        .then((res)=>{
            toast.success(res.data.message);
            setIsAdminAuthenticated(false);
        })
        .catch((err)=>{
            toast.error(response.err.data.message);
            
        })
      }
      if(!isAdminAuthenticated){
        <Navigate to="/"/>
      }

      

  return (

    <div>
        <div className="container form-component login-form">
        <h2>Update User Details</h2>
       
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="date"
            placeholder="date"
            value={dob}
            onChange={(e)=>setDob(e.target.value)}
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
            <button onChange={updateUserDetails} type="submit">Update Details</button>
          </div>
          </Link>
        </form>

        <p style={{ marginBottom: 0 }}>Want User Details to remain same</p>
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

export default UserProfile
