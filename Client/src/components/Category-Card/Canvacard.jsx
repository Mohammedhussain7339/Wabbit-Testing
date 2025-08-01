import { useLocation,useNavigate } from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";

    export default function Canvacard() {
      const navigate=useNavigate();
      const [profiles, setProfiles] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
    
      const [skillswork, setSkillswork] = useState("Canva Expert"); // Default to "Photo Editing"
      const handleViewProfile = (userId) => {
  navigate(`/FreelancerMainPage/${userId}`);
};

      // Fetch profiles based on skillswork
      const fetchProfiles = async (skill) => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await axios.get(`https://wabbit-backend.onrender.com/api/getprofile?skills=${skill}&check=true`);
          setProfiles(response.data.data);
          console.log(response.data.data)
        } catch (err) {
          setError(err.response?.data?.error || "Error fetching profiles");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        if (skillswork) {
          fetchProfiles(skillswork);
        }
      }, [skillswork]);
          const { pathname } = useLocation();

      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
    
      const elements = [];
    
      // Use a regular for loop instead of a while loop
      for (let canva = 0; canva < 8; canva++) {
        elements.push(
          <div key={canva} className="w-64 h-80 bg-white shadow-lg rounded-lg  m-6">
            {/* Card Content */}
          </div>
        );
      }
        
      return (
        <>
        <div className="my-10">
          <Navbar/>
        </div>
        <div className="w-full min-h-screen bg-gray-100 sm:p-8 md:p-10 font-nunito ">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-nunito text-left mx-6">
              Canva Experts
            </h1>
            <p className="text-lg md:text-xl text-left mt-2 mx-6">
              Work with a Canva expert to create stunning, professional designs that elevate your brand.
            </p>
    
            {/* Example Canva Design Section */}
            <div className="flex-shrink-0 w-28 sm:w-40 md:w-48 h-10 mx-6 bg-white shadow-lg rounded-lg flex justify-center items-center m-2">
              <h1 className="text-center text-sm md:text-base">Canva Design's</h1>
            </div>
    
            {/* Dynamically Generated Elements */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 w-full">
            {profiles.length > 0 ? (
              profiles.map((editor, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg w-full md:w-[300px] lg:w-[400px] p-4 rounded-lg flex flex-col"
                >
                  <div className="flex items-center">
                  <div className="w-20 h-20 capitalize flex justify-center items-center text-white text-3xl rounded-full bg-gray-400">
                    {editor.firstname[0]}
                  </div>
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
          </div>          </div>
        </div>
        </>
      );
    }
    
