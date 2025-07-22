import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";

export default function Photocard() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState("Photo Editor"); // Default to "Photo Editing"
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

  return (
    <>
      <div className="my-10">
        <Navbar />
      </div>
      <div className="w-full min-h-screen bg-gray-100 sm:p-8 md:p-14 font-nunito">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-nunito text-left">
            Photo Editor
          </h1>
          <p className="text-lg md:text-xl text-left mt-2">
            Transform your photo with professional editing services.
          </p>

          {/* Loading and Error Handling */}
          {loading && <p>Loading profiles...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display Profiles */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 w-full">
            {profiles.length > 0 ? (
              profiles.map((editor, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg w-full md:w-[300px] lg:w-[400px] p-4 rounded-lg flex flex-col"
                >
                  <div className="flex items-center">
                    <img
                      src={editor.image || "https://via.placeholder.com/100"}
                      alt={editor.firstname || "Profile Image"}
                      className="rounded-full shadow-lg w-14 h-14 sm:w-24 sm:h-24"
                    />
                    <div className="ml-4">
                      <h1 className="text-lg capitalize sm:text-xl md:text-2xl text-left">
                        {editor.firstname} {editor.lastname}
                      </h1>
                      <p className="text-left capitalize text-sm md:text-base">
                        {editor.skillswork}
                      </p>
                      <h2 className="text-left capitalize text-sm md:text-base">
                        {editor.region}
                      </h2>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 text-sm md:text-base">
                    <div className="text-left">
                      <h1>Delivery Time</h1>
                      <h2>{editor.deliveryTime || "N/A"}</h2>
                    </div>
                    <div className="text-left">
                      <h1>{editor.price || "N/A"}</h1>
                    </div>
                  </div>
                  <hr className="w-[80%] mx-auto mt-4" />

                  <div className="flex py-5 flex-row-reverse items-center">
                    {/* <h1 className="text-left text-sm md:text-base">
                      {editor.rating || "⭐0.0"}
                    </h1> */}
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
              ))
            ) : (
              !loading && <p>No profiles found for "Photo Editing".</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
