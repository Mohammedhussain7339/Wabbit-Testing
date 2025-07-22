import React, { useState, useEffect, useContext } from "react";
import { countries } from "../../../../../public/data/country";
import Profileget from "./profileget";
import axios from "axios";
import { Mycontext } from "../../../../context/Mycontext";
import { BiSolidEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

function Freelancer1() {

  const { imageUrl ,handleFileChange} = useContext(Mycontext);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState("");

  

  // useEffect(() => {
  //   console.log("Freelancer1 received imageUrl ok02:", imageUrl); // ✅ Debug log
  // }, [imageUrl]);

  const [profiledata, setProfiledata] = useState({
    firstname: "",
    lastname: "",
    occupation: "",
    university: "",
    region: "",
    city: "",
    portfolioLinks: "",
    description: "",
    skills: "",
    languages: [], // Start with an empty array
    contact: "",
    email: "",
    check:false,
  });

  const handleAddLanguage = () => {
    if (selectedLanguage && selectedProficiency) {

      const isDuplicate = profiledata.languages.some(
        (lang) => lang.language === selectedLanguage
      );

      if (!isDuplicate) {
        setProfiledata((prev) => ({
          ...prev,
          languages: [
            ...prev.languages,
            { language: selectedLanguage, proficiency: selectedProficiency },
          ],
        }));
      } else {
        toast.error("This language is already added.");
      }
    } else {
      toast.error("Please select both a language and a proficiency.");
    }
  };

  
  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfiledata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setProfiledata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  let userId = localStorage.getItem("_id");

  let profileId = localStorage.getItem("profile_id");

  const handleSubmit = (e) => {
    e.preventDefault();
     handleFileChange();

    const userId = localStorage.getItem("_id"); // Retrieve userId from local storage
    if (!userId) {
      console.error("User ID not found in localStorage");
      alert("User not logged in. Please log in first."); // User-friendly message
      return;
    }

    const payload = { ...profiledata, userId , imageUrl};


    axios
      .post("http://localhost:8000/api/profile", payload,)
      .then((response) => {
        toast.success("Form submitted successfully:");

        // Save the profile_id to local storage
        const profileId = response.data.profile_id;
        if (profileId) {
          localStorage.setItem("profile_id", profileId);

          toast.success("Profile Upadate successfully!"); // Display success toast
        } else {
          console.warn("No profile_id received in the response.");

          toast.warn("Profile saved, but no ID received."); // Display warning toast
        }

        // Reset the form if necessary
          setProfiledata({
            firstname: "",
            lastname: "",
            occupation: "",
            university: "",
            region: "",
            city: "",
            portfoliolinks: "",
            description: "",
            skills: [],
            contact: "",
            email: "",
            languages: "",
            check:""
          });

        
      })
      .catch((error) => {
        console.error("Error submitting form:", error);

        alert("An error occurred while saving the profile. Please try again.");
      });
  };

  const [index, setIndex] = useState(true)
const [showProfile, setShowProfile] = useState(false);


  return (
    <>
{profileId && showProfile ? (
  <Profileget index={showProfile} setIndex={setShowProfile} />
) : 
        <form className="flex flex-col w-full min-h-screen 320:p-0 p-4" onSubmit={handleSubmit}>

          {/* -------------------data entry--------------------- */}

          <div className="w-full   sm:w-full lg:w-full flex flex-col p-6 rounded-lg shadow-lg">
            {profileId ? <button className="bg-blue-400 w-16 p-1 rounded-full text-white" onClick={() => setShowProfile(true)}>Back</button> : null}
            <div className="flex  flex-col sm:flex-row justify-between mb-4">
              <div className="w-full sm:w-[48%] mb-4 sm:mb-0">
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm sm:text-base lg:text-lg">
                  First Name
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={profiledata.firstname || ""}
                    id="firstname"
                    onChange={handleChange}
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
                  value={profiledata.lastname}
                  id="lastname"
                  onChange={handleChange}
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
                value={profiledata.occupation}
                onChange={handleChange}
                type="text"
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
                value={profiledata.university}
                id="university"
                onChange={handleChange}
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
              <select
                id="region"
                value={profiledata.region}
                onChange={handleSelectChange}
                className="w-full p-2 border border-gray-300 rounded-md">
                {/* Add a placeholder option */}
                <option value="" disabled>
                  Select a region
                </option>
                {countries.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block mb-2 text-sm sm:text-base lg:text-lg">
                City
              </label>
              <select
                id="city"
                value={profiledata.city}
                onChange={handleSelectChange}
                className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Select City</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            {/* Website URL */}
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block mb-2 text-sm sm:text-base lg:text-lg">
                Website URL
              </label>
              <input
                type="text"
                value={profiledata.portfoliolinks}
                id="portfoliolinks"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm sm:text-base lg:text-lg">
                Description
              </label>
              <textarea
                id="description"
                value={profiledata.description}
                onChange={handleChange}
                placeholder="Write a brief description about yourself"
                className="w-full p-2 border border-gray-300 rounded-md h-32"></textarea>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                Skills
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  id="skills"
                  value={profiledata.skills}
                  onChange={(e) =>
                    setProfiledata((prev) => ({
                      ...prev,
                      currentSkill: e.target.value,
                    }))
                  }
                  className="w-[80%] h-10 rounded-lg border border-gray-400">
                  <option value="">Select Skill</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Photo Editor">Photo Editor</option>
                  <option value="Canva Expert">Canva Expert</option>
                  <option value="Invitation Card">Invitation Card</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Mockups">Mockups</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (profiledata.currentSkill) {
                      setProfiledata((prev) => ({
                        ...prev,
                        skills: [...prev.skills, prev.currentSkill],
                        currentSkill: "", // Clear the selected skill
                      }));
                    }
                  }}
                  className="text-white bg-maincolor px-4 rounded-lg">
                  ADD
                </button>
              </div>

              {/* Display Added Skills */}
              <div className="flex flex-wrap gap-2">
                {profiledata.skills.length > 0 ? (
                  profiledata.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm">
                      {skill}

                      <button
                        type="button"
                        onClick={() =>
                          setProfiledata((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((_, i) => i !== index),
                          }))
                        }
                        className="ml-2 text-red-600 font-bold">
                        &times;
                      </button>
                      
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
                {/* {item.skills} */}
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-col sm:flex-row justify-between my-4">
              <div>
                <h1 className="text-lg sm:text-2xl">Language</h1>
                <div className="mt-4">
                  <h2 className="text-lg">Added Languages</h2>
                  <ul className="list-disc pl-5">
                    {profiledata.languages.length > 0 ? (
                      profiledata.languages.map((lang, index) => (
                        <li key={index} className="text-sm">
                          {lang.language} - {lang.proficiency}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">No languages added yet.</p>
                    )}
                  </ul>
                </div>{" "}
              </div>
              <div className="sm:w-1/2 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <select
                  name="languages"
                  className="w-full h-10 sm:w-1/3 px-1 py-1 border border-black rounded-md"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}>
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Urdu">Urdu</option>
                </select>
                <select
                  value={selectedProficiency}
                  onChange={(e) => setSelectedProficiency(e.target.value)}
                  className="w-full h-10 sm:w-1/3 px-1 py-1 border border-black rounded-md">
                  <option value="">Select Proficiency</option>
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native/Bilingual">Native/Bilingual</option>
                </select>

                <button
                  className="w-full h-10 sm:w-auto text-white py-1 bg-green-600 rounded-md px-6 text-lg"
                  onClick={handleAddLanguage}>
                  <b>Add</b>
                </button>
              </div>
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
                value={profiledata.contact}
                onChange={handleChange}
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
                value={profiledata.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />

            </div>

            <button
              type="submit"
              className="bg-maincolor text-white px-5 py-2 rounded-lg mt-3 mb-14">
              Submit
            </button>

          </div>
          <ToastContainer />
        </form>
      }
    </>
  );
}

export default Freelancer1;
