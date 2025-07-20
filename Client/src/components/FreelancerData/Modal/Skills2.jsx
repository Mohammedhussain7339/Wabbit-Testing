import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Skills2() {
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
        const res = await axios.get(`http://localhost:8000/api/portfolio/${userId}`);
        setPortfolio(res.data);
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
  if (!portfolio || !portfolio.projectCategorise?.length) return <p className="text-center mt-10">No skills found.</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {portfolio.projectCategorise.map((category, index) => (
        <div
          key={index}
          className="w-[150px] text-center py-2 rounded-lg shadow-md bg-white border border-gray-200 font-semibold text-sm hover:shadow-lg transition-all duration-200"
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default Skills2;
