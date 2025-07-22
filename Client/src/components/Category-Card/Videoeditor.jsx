import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import Navbar from "../Home/Navbar/Navbar";
import FAQContent from "../Requirement/FAQContent";
import axios from "axios";
function Videoeditor() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState("Video Editor"); // Default to "Photo Editing"
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
  const { pathname } = useLocation();
  const [isModal, setisModal] = useState(false);

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

  return (
    <>
      <div className="my-10">
        <Navbar />
      </div>
      <div className="w-full min-h-screen bg-gray-100 sm:p-8 md:p-14 font-nunito">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-nunito text-left">
            Video Editor
          </h1>
          <p className="text-lg md:text-xl text-left mt-2">
            Transform your Video with professional editors.
          </p>

          {/* Editor Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-8  w-full">
            {profiles.map((editor, index) => (
              <div
                key={index}
                className="bg-white shadow-lg w-full md:w-[300px] lg:w-[400px] p-4 rounded-lg flex flex-col"
              >
                <div className="flex items-center">
                  <img
                    src={editor.image}
                    alt={editor.firstname}
                    className="rounded-full w-15 h-15 sm:w-24 sm:h-24 object-cover "
                  />
                  <div className="ml-4">
                    <h1 className="text-lg sm:text-xl md:text-2xl text-left">
                      {editor.firstname}{editor.lastname}
                    </h1>
                    <p className="text-left text-sm md:text-base">
                      {editor.skillswork}
                    </p>
                    <h2 className="text-left text-sm md:text-base">
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
                    <h1>{"100$"}</h1>
                  </div>
                </div>
                <hr className="w-[80%] mx-auto mt-4" />

                {/* Rating & Hire Button Section */}
                <div className="flex py-5 gap-2 flex-row-reverse items-center">
                  <button
                    className="py-2 px-4 bg-maincolor text-white rounded-full hover:bg-opacity-90 transition"
                    onClick={() => {
                      setisModal(true);
                    }}
                  >Hire Me
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

        {/* Modal */}
        {isModal && (
          <div className="absolute h-[100vh] w-[100vw] top-0 z-50 left-0 bg-[rgb(0,0,0,0.8)] flex items-center justify-center">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="w-[90vw] md:w-[80vw] lg:w-[600px] xl:w-[550px] bg-white h-[85vh] rounded-2xl flex flex-row overflow-hidden">
                <FAQContent />
              </div>
            </ClickAwayListener>
          </div>
        )}
      </div>
    </>
  );
}

export default Videoeditor;
