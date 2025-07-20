import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Portfolio1() {
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
    <div className="flex gap-4 flex-wrap justify-center p-4">
      <div className="w-[300px] h-[300px] bg-white shadow-md p-2 rounded-md">
        <img
          src={portfolio.portfolio}
          alt={portfolio.title}
          className="w-full h-[80%] object-cover rounded-md"
        />
        <h1 className="text-center font-semibold mt-2">{portfolio.title}</h1>
      </div>
    </div>
  );
}

export default Portfolio1;
