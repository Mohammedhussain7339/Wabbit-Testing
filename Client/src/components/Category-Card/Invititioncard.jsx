import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
export default function Invitioncard() {

  const [skills, setSkills] = useState("Invitation Card"); // Default to "Photo Editing"
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();  
    const handleViewProfile = (userId) => {
    navigate(`/FreelancerMainPage/${userId}`);
  };
  

  // Fetch profiles based on skillswork
  const fetchProfiles = async (skill) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/getprofile?skills=${skill}`
      );
      setProfiles(response.data.data);
      console.log(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skills) {
      fetchProfiles(skills);
    }
  }, [skills]);

  const videoCategories = [
    "Wedding Invitation",
    "Birthday Party Inviation",
    "Corporate Event Invitations",
    "Baby Shower Invitations",
    "Party Invitations",
  ];

  const editors = [
    {
      name: "Harsh Vaishnav",
      profession: "Video Editor",
      country: "India",
      deliveryTime: "24 Hour's",
      price: "From ₹441",
      rating: "⭐4.3",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "John Doe",
      profession: "Video Editor",
      country: "USA",
      deliveryTime: "48 Hour's",
      price: "From ₹500",
      rating: "⭐4.8",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Jane Smith",
      profession: "Video Editor",
      country: "Canada",
      deliveryTime: "12 Hour's",
      price: "From ₹350",
      rating: "⭐4.5",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Michael Scott",
      profession: "Video Editor",
      country: "USA",
      deliveryTime: "36 Hour's",
      price: "From ₹650",
      rating: "⭐4.7",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Rachel Green",
      profession: "Video Editor",
      country: "UK",
      deliveryTime: "24 Hour's",
      price: "From ₹600",
      rating: "⭐4.9",
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Monica Geller",
      profession: "Video Editor",
      country: "USA",
      deliveryTime: "24 Hour's",
      price: "From ₹700",
      rating: "⭐4.6",
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
<>
    <div className="my-10">
    <Navbar/>
  </div>

    <div className="w-full min-h-screen bg-gray-100 sm:p-8 md:p-14 font-nunito ">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-nunito text-left">
        Invitation Card        </h1>
        <p className="text-lg md:text-xl text-left mt-2">
        Create personalized invitation cards for any occasion that leave a lasting impression.        </p>

        {/* Video Categories */}
        <div className="w-full overflow-x-scroll">
          <div className="flex w-[700px] lg:w-full  justify-center sm:justify-start space-x-2 sm:space-x-4 mt-6 overflow-x-scroll  px-4">
            {videoCategories.map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 sm:w-40 md:w-48 h-10 bg-white shadow-lg rounded-lg flex justify-center items-center m-2">
                <h1 className="text-center text-sm md:text-base">{category}</h1>
              </div>
            ))}
          </div>
        </div>
        {/* Editor Cards */}
        <div className="flex flex-wrap justify-center gap-6 mt-8  w-full">
          {profiles.map((editor, index) => (
            <div
              key={index}
              className="bg-white shadow-lg w-full md:w-[300px] lg:w-[400px] p-4 rounded-lg flex flex-col">
              <div className="flex items-center">
                  <div className="w-20 h-20 capitalize flex justify-center items-center text-white text-3xl rounded-full bg-gray-400">
                    {editor.firstname[0]}
                  </div>
                <div className="ml-4">
                  <h1 className="text-lg capitalize sm:text-xl md:text-2xl text-left">
                    {editor.firstname}{editor.lastname}
                  </h1>
                  <p className="text-left capitalize text-sm md:text-base">
                    {editor.skillswork}
                  </p>
                  <h2 className="text-left capitalize text-sm md:text-base">
                    {editor.region}
                  </h2>
                </div>
              </div>

              {/* Delivery & Price Section */}
              <div className="flex justify-between mt-4 text-sm md:text-base">
                <div className="text-left">
                  <h1>Delivery Time</h1>
                  <h2>{"24 Hour's"}</h2>
                </div>
                <div className="text-left">
                  <h1>{"From ₹350"}</h1>
                </div>
              </div>
              <hr className="w-[80%] mx-auto mt-4" />

              {/* Rating & Hire Button Section */}
              <div className="flex py-5 flex-row-reverse items-center">
                <button className="py-2 px-4 bg-maincolor text-white rounded-full hover:bg-opacity-90 transition">
                  Hire Me
                </button>
<button
  className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-opacity-90 transition"
  onClick={() => handleViewProfile(editor.userId)}
>
  View Profile
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
