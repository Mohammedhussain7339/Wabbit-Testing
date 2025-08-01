import React, { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";

import axios from "axios";
function Profileget({ index, setIndex }) {

  const profileId = localStorage.getItem("profile_id");
  
  const [profiledata, setProfileData] = useState([]);
   // Initialize as an empty array

  const fetchdata = async () => {
    if (profileId) {
      try {
       const response = await axios.get(
  `https://wabbit.onrender.com/api/getprofile?id=${profileId}`
);
        
        const data = response.data?.data;

        // If data is an object, wrap it in an array to ensure compatibility with .map()
        setProfileData(Array.isArray(data) ? data : [data]);
       
      } catch (error) {
        console.log(error, "errorror");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [profileId]);


  const updateHandle = () => {
    setIndex(false);
  };

  return (
    <div>
      {profiledata.map((item, index) => (
        <div
        key={index}
        className="w-full  sm:w-full lg:w-full flex flex-col p-6 rounded-lg shadow-lg">
          <div className="flex  flex-col sm:flex-row justify-between mb-4">
            <div className="w-full sm:w-[48%] mb-4 sm:mb-0">
              <label
                htmlFor="firstname"
                className="flex items-center mb-2 text-sm sm:text-base lg:text-lg">
                First Name
                <BiSolidEdit
                  className="cursor-pointer"
                  onClick={updateHandle}
                />
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="firstname"
                  value={item.firstname}
                  //   onChange={handleChange}
                  className="w-full lg:h-10 sm:h-8 p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm sm:text-base lg:text-lg">
                Last Name
              </label>
              <input
                type="text"
                value={item.lastname}
                className="w-full lg:h-10 sm:h-8 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="mb-4">
            <label
              htmlFor="occupation"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              Occupation
            </label>
            <input
              type="text"
              value={item.occupation}
              id="occupation"
              placeholder="Ex: Senior Designer, Art Director, Student"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* University */}
          <div className="mb-4">
            <label
              htmlFor="university"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              University
            </label>
            <input
              type="text"
              id="university"
              value={item.university}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Region */}
          <div className="mb-4">
            <label
              htmlFor="region"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              Region
            </label>
            <input
              type="text"
              value={item.region}
              id="region"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              City
            </label>
            <input
              type="text"
              value={item.city}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Website URL */}
          <div className="mb-4">
            <label
              htmlFor="website"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              Website URL
            </label>
            <div className="w-full p-2 border border-gray-300 rounded-md">
              <a href="" className="hover:text-blue-600 ">
              {item.portfoliolinks}
              </a>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              Description
            </label>
            <textarea
              value={item.description}
              id="description"
              placeholder="Write a brief description about yourself"
              className="w-full p-2 border border-gray-300 rounded-md h-32"></textarea>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
              Skills
            </h1>
            <div className="flex flex-wrap gap-2 mb-4"></div>
            <input
              value={item.skills}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />

            {/* Display Added Skills */}
          </div>

          {/* Languages */}
          {/* Languages */}
          <div className="flex flex-col my-4">
            <h1 className="text-lg sm:text-2xl mb-4">Languages</h1>
            {item.languages && item.languages.length > 0 ? (
              item.languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4">
                  {/* Language Name */}
                  <input
                    type="text"
                    value={lang.language}
                    readOnly // Prevent editing if needed
                    className="w-full sm:w-1/3 h-10 px-1 py-1 border border-gray-300 rounded-md"
                  />
                  {/* Proficiency */}
                  <input
                    type="text"
                    value={lang.proficiency}
                    readOnly // Prevent editing if needed
                    className="w-full sm:w-1/3 h-10 px-1 py-1 border border-gray-300 rounded-md"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No languages listed.</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label
              htmlFor="contact"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              Phone Number
            </label>
            <input
              type="text"
              id="contact"
              value={item.contact}
              placeholder="+91"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm sm:text-base lg:text-lg">
              Email
            </label>

            <input
              type="email"
              id="email"
              value={item.email}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {!profileId ? (
            <button
              type="submit"
              className="bg-maincolor text-white px-5 py-2 rounded-lg mt-3 mb-14">
              Submit
            </button>
          ) : (
<button
  type="button"
  onClick={updateHandle}
  className="bg-maincolor text-white px-5 py-2 rounded-lg mt-3 mb-14">
  Update
</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Profileget;
