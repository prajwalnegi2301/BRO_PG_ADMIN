import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import {
  FaLocationArrow,
  FaBed,
  FaCar,
  FaEdit,
  FaDumbbell,
  FaCouch,
  FaTrash,
  FaRegImage,
  FaSave,
  FaUtensils,
  FaUserFriends,
  FaBath,
  FaSnowflake,
  FaMoneyBill,
  FaBurn,
  FaCubes,
  FaGamepad,
  FaTshirt,
  FaParking,
} from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import AdminNavbar from "../components/AdminNavbar";

const Profile = () => {
 

  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [gym, setGym] = useState("");
  const [parking, setParking] = useState("");
  const [furnish, setFurnish] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [image1Avatar, setimage1Avatar] = useState("");
  const [image1AvatarPreview, setimage1AvatarPreview] = useState("");
  const [image2Avatar, setimage2Avatar] = useState("");
  const [image2AvatarPreview, setimage2AvatarPreview] = useState("");
  const [image3Avatar, setimage3Avatar] = useState("");
  const [image3AvatarPreview, setimage3AvatarPreview] = useState("");
  const [image4Avatar, setimage4Avatar] = useState("");
  const [image4AvatarPreview, setimage4AvatarPreview] = useState("");
  const [pgFlat, setPgFlat] = useState("");
  const [food, setFood] = useState("");
  const [sharing, setSharing] = useState("");
  const [attachWashroom, setAttachWashroom] = useState("");
  const [ac, setAc] = useState("");
  const [rent, setRent] = useState("");
  const [geyser, setGeyser] = useState("");
  const [fridge, setFridge] = useState("");
  const [indoorGames, setIndoorGames] = useState("");
  const [clothWashingService, setClothWashingService] = useState("");
  const [name, setName] = useState("");

  const { isAuthenticated, setIsAuthenticated, properties, setProperties } =
    useContext(Context);

  const navigateTo = useNavigate();

  const getAllProperties = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/property/getAllProperties",
        { withCredentials: true }
      );
      setProperties(data.properties);
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleAvatarImage1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimage1AvatarPreview(reader.result);
      setimage1Avatar(file);
    };
  };
  const handleAvatarImage2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimage2AvatarPreview(reader.result);
      setimage2Avatar(file);
    };
  };
  const handleAvatarImage3 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimage3AvatarPreview(reader.result);
      setimage3Avatar(file);
    };
  };
  const handleAvatarImage4 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimage4AvatarPreview(reader.result);
      setimage4Avatar(file);
    };
  };

  const addProperty = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("location", location);
      formData.append("bedrooms", bedrooms);
      formData.append("purpose", purpose);
      formData.append("gym", gym);
      formData.append("furnish", furnish);
      formData.append("parking", parking);
      formData.append("name", name);
      formData.append("image1Avatar", image1Avatar);
      formData.append("image2Avatar", image2Avatar);
      formData.append("image3Avatar", image3Avatar);
      formData.append("image4Avatar", image4Avatar);
      formData.append("pgFlat", pgFlat);
      formData.append("food", food);
      formData.append("sharing", sharing);
      formData.append("attachWashroom", attachWashroom);
      formData.append("ac", ac);
      formData.append("rent", rent);
      formData.append("geyser", geyser);
      formData.append("fridge", fridge);
      formData.append("indoorGames", indoorGames);
      formData.append("clothWashingService", clothWashingService);

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/property/createProperty",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      getAllProperties();
      toast.success(data.message);
      setName("");
      setLocation("");
      setPurpose("");
      setGym("");
      setFurnish("");
      setParking("");
      setBedrooms("");
      setimage1Avatar("");
      setimage1AvatarPreview("");
      setimage2Avatar("");
      setimage2AvatarPreview("");
      setimage3Avatar("");
      setimage3AvatarPreview("");
      setimage4Avatar("");
      setimage4AvatarPreview("");
      setPgFlat("");
      setFood("");
      setSharing("");
      setAttachWashroom("");
      setAc("");
      setRent("");
      setGeyser("");
      setFridge("");
      setIndoorGames("");
      setClothWashingService("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/property/deleteProperty/${propertyId}`,
        { withCredentials: true }
      );
      toast.success("Property deleted successfully");
      getAllProperties();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateStatus = async (propertyId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/property/update/${propertyId}`,
        { status },
        { withCredentials: true }
      );
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId
            ? { ...property, status }
            : property
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error updating properties status:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    getAllProperties();
  }, [isAuthenticated]);

  return (
    <div className="bg-blue-200">
      <AdminNavbar />
      <div className="max-w-2xl bg-white mx-auto mt-10 p-6  shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 mt-12 text-center">
          Create Property Listing
        </h1>
        <form onSubmit={addProperty} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            
            <div className="flex flex-col items-center">
              <img
                src={
                  image1AvatarPreview ? image1AvatarPreview : "/docHolder.jpg"
                }
                alt="Image1 Avatar"
                className="w-32 h-32 rounded-full bg-blue-200 text-white object-cover mb-4"
              />
              <label className="flex items-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600">
                <FaRegImage className="mr-2" /> Upload Image
                <input
                  type="file"
                  onChange={handleAvatarImage1}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={
                  image2AvatarPreview ? image2AvatarPreview : "/docHolder.jpg"
                }
                alt="Image2 Avatar"
                className="w-32 h-32 rounded-full bg-blue-200 text-white object-cover mb-4"
              />
              <label className="flex items-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600">
                <FaRegImage className="mr-2" /> Upload Second Image
                <input
                  type="file"
                  onChange={handleAvatarImage2}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={
                  image3AvatarPreview ? image3AvatarPreview : "/docHolder.jpg"
                }
                alt="Image3 Avatar"
                className="w-32 h-32 rounded-full bg-blue-200 text-white object-cover mb-4"
              />
              <label className="flex items-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600">
                <FaRegImage className="mr-2" /> Upload Third Image
                <input
                  type="file"
                  onChange={handleAvatarImage3}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={
                  image4AvatarPreview ? image4AvatarPreview : "/docHolder.jpg"
                }
                alt="Image4 Avatar"
                className="w-32 h-32 rounded-full bg-blue-200 text-white object-cover mb-4"
              />
              <label className="flex items-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600">
                <FaRegImage className="mr-2" /> Upload Last Image
                <input
                  type="file"
                  onChange={handleAvatarImage4}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <FaLocationArrow className="mr-2 text-blue-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Name"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <FaLocationArrow className="mr-2 text-blue-500" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Location"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <FaBed className="mr-2 text-blue-500" />
            <input
              type="text"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Bedrooms"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <MdOutlineAttachMoney className="mr-2 text-blue-500" />
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Purpose</option>
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaParking className="mr-2 text-blue-500" />
            <select
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Parking</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaDumbbell className="mr-2 text-blue-500" />
            <select
              value={gym}
              onChange={(e) => setGym(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Gym</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaBath className="mr-2 text-blue-500" />
            <select
              value={attachWashroom}
              onChange={(e) => setAttachWashroom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Attach Washroom</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaSnowflake className="mr-2 text-blue-500" />
            <select
              value={ac}
              onChange={(e) => setAc(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Air Conditioning</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaBurn className="mr-2 text-blue-500" />
            <select
              value={geyser}
              onChange={(e) => setGeyser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Geyser</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaCubes className="mr-2 text-blue-500" />
            <select
              value={fridge}
              onChange={(e) => setFridge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Fridge</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaTshirt className="mr-2 text-blue-500" />
            <select
              value={clothWashingService}
              onChange={(e) => setClothWashingService(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Cloth Washing Service</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaGamepad className="mr-2 text-blue-500" />
            <select
              value={indoorGames}
              onChange={(e) => setIndoorGames(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Indoor Games</option>
              <option value="BilliardPool">Billiard Pool</option>
              <option value="Carrom">Carrom</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaMoneyBill className="mr-2 text-blue-500" />
            <select
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Rent</option>
              <option value="10000">10000</option>
              <option value="10500">10500</option>
              <option value="18000">18000</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaUserFriends className="mr-2 text-blue-500" />
            <select
              value={sharing}
              onChange={(e) => setSharing(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Sharing</option>
              <option value="SingleSharing">Single Sharing</option>
              <option value="DoubleSharing">Double Sharing</option>
              <option value="TripleSharing">Triple Sharing</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaUtensils className="mr-2 text-blue-500" />
            <select
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Food</option>
              <option value="WithFood">With Food</option>
              <option value="WithoutFood">Without Food</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaBed className="mr-2 text-blue-500" />
            <select
              value={pgFlat}
              onChange={(e) => setPgFlat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">PG/Flat</option>
              <option value="Pg">PG</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <FaCouch className="mr-2 text-blue-500" />
            <select
              value={furnish}
              onChange={(e) => setFurnish(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Furnish</option>
              <option value="Furnished">Furnished</option>
              <option value="SemiFurnished">Semi Furnished</option>
              <option value="UnFurnished">Unfurnished</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center"
          >
            <FaSave className="mr-2" /> Add Property
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Properties</h2>
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property._id}
                className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="text-lg flex justify-center items-center font-bold mb-2 text-blue-600">
                  {property.name}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Image 1 */}
                  <img
                    src={property.image1Avatar && property.image1Avatar.url}
                    alt="Property Image 1"
                    className="w-full h-48 object-cover rounded mb-4"
                  />

                  {/* Image 2 */}
                  <img
                    src={property.image2Avatar && property.image2Avatar.url}
                    alt="Property Image 2"
                    className="w-full h-48 object-cover rounded mb-4"
                  />

                  {/* Image 3 */}
                  <img
                    src={property.image3Avatar && property.image3Avatar.url}
                    alt="Property Image 3"
                    className="w-full h-48 object-cover rounded mb-4"
                  />

                  {/* Image 4 */}
                  <img
                    src={property.image4Avatar && property.image4Avatar.url}
                    alt="Property Image 4"
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                </div>

                <div className="flex items-center mb-2" value={property.location} 
                >
  
                 
                  {property.location}</div>
                



                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Purpose: <MdOutlineAttachMoney /> {property.purpose}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Bedrooms: <FaBed /> {property.bedrooms}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Food: <FaUtensils /> {property.food}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Sharing: <FaUserFriends /> {property.sharing}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Attached Washroom: <FaBath /> {property.attachWashroom}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    AC: <FaSnowflake /> {property.ac}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Rent: <FaMoneyBill /> {property.rent}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Geyser: <FaBurn /> {property.geyser}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Fridge: <FaCubes /> {property.fridge}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Indoor Games: <FaGamepad /> {property.indoorGames}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Cloth Washing Service: <FaTshirt />{" "}
                    {property.clothWashingService}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Parking: <FaCar /> {property.parking}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Gym: <FaDumbbell /> {property.gym}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Furnish: <FaCouch /> {property.furnish}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-full px-2 py-1 border border-gray-300 rounded">
                    Pg/Flat: <FaBed /> {property.pgFlat}
                  </span>
                </div>

                <button
                  onClick={() => deleteProperty(property._id)}
                  className="text-red-500 hover:text-red-700 mx-1"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleUpdateStatus(property._id,e.target.value)}
                  className="text-red-500 hover:text-red-700 mx-1"
                >
                  <FaEdit />
                </button>
              </div>
            ))
          ) : (
            <h2 className="text-center text-gray-500">No Properties Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
