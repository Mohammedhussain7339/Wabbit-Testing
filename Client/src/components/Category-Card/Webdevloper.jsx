import React from 'react'
import { useContext, useEffect, useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import Navbar from "../Home/Navbar/Navbar";
import axios from 'axios';
function Webdevloper() {
  const navigate=useNavigate();
  const [skills, setSkills] = useState("Web Developer"); // Default to "Photo Editing"
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const handleViewProfile = (userId) => {
  navigate(`/FreelancerMainPage/${userId}`);
};


  // Fetch profiles based on skillswork
  const fetchProfiles = async (skill) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
  `http://localhost:8000/api/getprofile?skills=${skill}&check=true`
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
    const { pathname } = useLocation();
    const [isModal, setisModal] = useState(false);
    // const { progressbar, setfaqQuestion, setprogressbar } = useContext(Mycontext);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    const handleClickAway = () => {
      setisModal(false);
    };
  
    useEffect(() => {
      if (isModal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
  
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [isModal]);
  
    const videoCategories = [
      "Social Media Photo’s",
      "Product Photo Editing",
      "Photo Manipulation",
      "Youtube Thumbnail",
      "Portraits Retouching",
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
      {
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-nunito text-left">
            Web Devloper 
          </h1>
          <p className="text-lg md:text-xl text-left mt-2">
            Transform your Photo with professional editing services.{" "}
          </p>

          {/* Video Categories */}
          <div className="w-full overflow-x-scroll">
            <div className="flex w-[700px] lg:w-full  justify-center sm:justify-start space-x-2 sm:space-x-4 mt-6 overflow-x-scroll  px-4">
              {videoCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-28 sm:w-40 md:w-48 h-10 bg-white shadow-lg rounded-lg flex justify-center items-center m-2"
                >
                  <h1 className="text-center text-sm md:text-base">
                    {category}
                  </h1>
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
              <div className="flex py-5 flex-row-reverse gap-2 items-center">
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
      }
      {isModal && (
        <div className="absolute h-[100vh] w-[100vw] top-0 z-50 left-0 bg-[rgb(0,0,0,0.8)] flex items-center justify-center">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-[90vw] md:w-[80vw] lg:w-[600px] xl:w-[550px] bg-white h-[85vh] rounded-2xl flex flex-row overflow-hidden">
              <div className="w-[100%] xl:w-[100%] h-full flex flex-col items-center justify-center relative">
                <div className="h-[10%] border w-full absolute top-0 flex px-7 items-center justify-between">
                  <div className="w-[95%] h-auto flex items-center justify-center">
                    <div className="w-[80%] h-[7px] bg-gray-100 rounded-lg ">
                      <div
                        style={{ width: `${progressbar}%` }}
                        className="h-full bg-maincolor rounded-lg"
                      ></div>
                    </div>
                  </div>
                  <div
                    className="w-[5%] text-lg text-center cursor-pointer"
                    onClick={() => {
                      setisModal(false);
                      setfaqQuestion(1);
                      setprogressbar(16.66);
                    }}
                  >
                    <RxCross2 />
                  </div>
                </div>
                <FAQContent />
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </div>
    </>
  )
}

export default Webdevloper
