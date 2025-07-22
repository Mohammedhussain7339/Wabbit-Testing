import React, { useRef, useState } from 'react';
import Portfolio from './Modal/Portfolio1';
import Skills from './Modal/Skills2';
import Trustedby from './Modal/Trustedby3';
import Aboutme from './Modal/Aboutme4';
import { IoCameraOutline, IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Navbar from '../Home/Navbar/Navbar';
import Footer from '../Home/Footer'

function FreelancerMainPage() {
  const { userId,username } = useParams();
  console.log(username)
  console.log(userId)
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  // const [username, setUsername] = useState("John Doe");
  const [activeProfile, setActiveProfile] = useState("Portfolio");


  return (
    <div>
      <div className="lg:w-[100vw] bg-bgmain py-14  h-screen flex flex-col lg:justify-center sm:flex-row">
        <Navbar/>
        {/* Sidebar */}
        {/* <aside className="w-full sm:w-[400px] flex justify-center p-5">
          <div className="bg-white shadow-lg w-full max-w-[380px] h-[400px] flex flex-col justify-center items-center rounded-lg p-4">
            <div className="sm:w-1/2 flex justify-center sm:justify-start">
              <div className="flex flex-col items-center relative">
                <div className="w-[163px] cursor-pointer h-[164px] rounded-full border-2 border-black flex justify-center items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div onClick={() => fileInputRef.current.click()}>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="bg-center bg-cover h-[164px] w-[163px] rounded-full"
                      />
                    ) : profileImg ? (
                      <img
                        src={profileImg}
                        alt="Profile Image"
                        className="bg-center bg-cover h-[164px] w-[163px] rounded-full"
                      />
                    ) : (
                      <IoCameraOutline className="text-4xl cursor-pointer" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl mt-3">{username}</h1>
            <div className="flex items-center mt-1">
              <IoLocationOutline className="mr-2" /> India
            </div>
            <hr className="w-full h-[2px] bg-bgmain my-4" />
            <div className="flex justify-between w-full">
              <h1>Member since</h1>
              <h1>June 2024</h1>
            </div>
            <div className="flex justify-between w-full">
              <h1>Rating</h1>
              <h1 className="text-[10px]">⭐️⭐️⭐️⭐️⭐️</h1>
            </div>
          </div>
        </aside> */}
                <aside className="w-full sm:w-[400px] flex justify-center p-5 ">
        
                  <div className="bg-white shadow-lg w-full max-w-[380px] h-[400px] flex flex-col justify-center items-center rounded-lg p-4">
        
                    <div className="sm:w-1/2 flex justify-center sm:justify-start">
        
                      <div className="flex flex-col items-center relative">
        
                        <div className="w-[163px] cursor-pointer h-[164px] rounded-full bg-maincolor border-2 border-black flex justify-center items-center">
<h1 className="text-2xl">{username}</h1>
<div className="avatar text-6xl text-white">
  {username?username && username[0].toUpperCase():"G"}
</div>
        
        
                        </div>
                      </div>
        
        
                    </div>
                    <h1 className="text-2xl">{username}</h1>
        
                    <div className="flex items-center">
                      <IoLocationOutline className="mr-2" /> India
                    </div>
                    <hr className="w-full h-[2px] bg-bgmain my-4" />
                    <div className="flex justify-between w-full">
                      <h1>Member since</h1>
                      <h1>June 2024</h1>
                    </div>
                    <div className="flex justify-between w-full">
                      <h1>Rating</h1>
                      <h1 className="text-[10px]">⭐️⭐️⭐️⭐️⭐️</h1>
                    </div>
                  </div>
                </aside>
        {/* Main Section */}
        <div className="flex flex-col w-full sm:w-2/3">
          <nav className="bg-white text-[13px] md:text-lg lg:w-[90%] lg:mx-auto rounded shadow-lg mt-8 flex-shrink-0 h-16 flex items-center justify-around">
            <button
              className={`text-black ${activeProfile === "Portfolio" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Portfolio")}
            >
              ProfileInfo
            </button>
            <button
              className={`text-black ${activeProfile === "Skills" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Skills")}
            >
              Portfolio
            </button>
            <button
              className={`text-black ${activeProfile === "Trustedby" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Trustedby")}
            >
              Trusted By
            </button>
            <button
              className={`text-black ${activeProfile === "Aboutme" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Aboutme")}
            >
              About Me
            </button>
          </nav>

          {/* Dynamic Section */}
          <main className="p-4 flex-grow overflow-y-auto sm:mx-8">
            {activeProfile === "Portfolio" && <Portfolio />}
            {activeProfile === "Skills" && <Skills />}
            {activeProfile === "Trustedby" && <Trustedby />}
            {activeProfile === "Aboutme" && <Aboutme />}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default FreelancerMainPage;
