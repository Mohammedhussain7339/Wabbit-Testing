import React, { useState, useEffect } from "react";
import axios from "axios";

function Freelancer3() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("_id");

  const fetchProfiles = async () => {
    if (!userId) {
      setError("User ID not found");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(
  `https://wabbit.onrender.com/api/getprofile?userId=${userId}`); 
      // Ensure profiles is always an array
      const fetchedProfiles = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
  
      setProfiles(fetchedProfiles);
      console.log("Fetched Profiles:", fetchedProfiles);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching profiles");
    } finally {
      setLoading(false);
    }
  };
    // Automatically fetch profiles when the component loads
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="p-4">

        {profiles.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:flex-row sm:justify-between items-center bg-white w-full rounded-md py-4 px-6 mb-4 shadow-md"
          >
            <div>
              <h1 className="text-lg font-bold text-maincolor">{item.firstname} {item.lastname}</h1>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <button className="text-white bg-maincolor px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
              Contact me
            </button>
          </div>))}
    </div>
  );
}

export default Freelancer3;
