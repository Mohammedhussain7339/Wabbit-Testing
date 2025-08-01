import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Aboutme4() {
    const { userId } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }
  
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`https://wabbit.onrender.com/api/portfolio/${userId}`);
          setPortfolio(res.data);
          console.log(portfolio)
        } catch (error) {
          console.error("Error fetching portfolio:", error.message);
          setError("Failed to fetch portfolio.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [userId]);
  
    if (loading) return <p className="text-center mt-10">Loading portfolio...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!portfolio) return <p className="text-center mt-10">No portfolio found.</p>;
  
  return (
    <div>
<div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200 text-gray-800 leading-relaxed text-justify">
    <h1>{portfolio.about}</h1>
  
</div>
    </div>
  )
}

export default Aboutme4
