import React, {  useEffect,  useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import Freelancer1 from "../Profile/Modals/Freelancer1";
import Freelancer2 from "../Profile/Modals/Freelancer2";
import Freelancer3 from "../Profile/Modals/Freelancer3";
import axios from "axios";

export default function Profile() {
  const [profileImg, setProfileImg] = useState("");


  const profileId = localStorage.getItem("profile_id");



  const [activeProfile, setActiveProfile] = useState("Freelancer1"); // Active tab state
  const username = localStorage.getItem("username");
  

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);



  const fetchdata = async () => {
    if (profileId) {
      try {
        const response = await axios.get(`https://wabbit.onrender.com/api/getprofileimg?id=${profileId}`);
        const ProfileImg = response.data.imageUrl;

        setProfileImg(ProfileImg);

      } catch (error) {
        console.log(error, "errorror");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [profileId]);


  return (
    <>
      <div className=" lg:w-[81vw] bg-bgmain w-[100vw]  h-screen flex flex-col  lg:justify-center sm:flex-row">

        {/* Sidebar */}
        <aside className="w-full sm:w-[400px] flex justify-center p-5 ">

          <div className="bg-white shadow-lg w-full max-w-[380px] h-[400px] flex flex-col justify-center items-center rounded-lg p-4">

            <div className="sm:w-1/2 flex justify-center sm:justify-start">

              <div className="flex flex-col items-center relative">

                <div className="w-[163px] cursor-pointer h-[164px] rounded-full bg-maincolor border-2 border-black flex justify-center items-center">
<div className="avatar text-6xl text-white">
  {username && username[0].toUpperCase()}
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

        {/* TopSideNavbar */}

        <div className="flex flex-col w-full sm:w-2/3">

          <nav className="bg-white text-[13px] md:text-lg lg:w-[90%] lg:mx-auto rounded shadow-lg mt-8 flex-shrink-0 h-16 flex items-center justify-around">

            <button
              className={`text-black ${activeProfile === "Freelancer1" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Freelancer1")}
            >
              ProfileInfo
            </button>

            <button
              className={`text-black ${activeProfile === "Freelancer2" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Freelancer2")}
            >
              Portfolio
            </button>

            <button
              className={`text-black ${activeProfile === "Freelancer3" ? "underline" : ""}`}
              onClick={() => setActiveProfile("Freelancer3")}
            >
              PreviousWork/Review
            </button>

          </nav>

          {/* Main Content */}
          <main className="p-4 flex-grow overflow-y-auto sm:mx-8">
            {activeProfile === "Freelancer1" && <Freelancer1 />}
            {activeProfile === "Freelancer2" && <Freelancer2 />}
            {activeProfile === "Freelancer3" && <Freelancer3 />}
          </main>

        </div>
      </div>
    </>
  );
}
