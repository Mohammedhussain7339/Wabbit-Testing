import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Portfolio1() {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

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

  // Helper: Extract YouTube Video ID
const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
};

  const videoId = getYouTubeVideoId(portfolio.url);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Image Card */}
      <div className="w-[300px] bg-white shadow-md p-2 rounded-md">
        <img
          src={portfolio.portfolio}
          alt={portfolio.title}
          className="w-full h-[240px] object-cover rounded-md"
        />
        <h1 className="text-center font-semibold mt-2">{portfolio.title}</h1>
      </div>

      {/* Video URL & Click */}
      {portfolio.url && (
        <div className="text-center">
          {!showVideo ? (
            <button
              className="text-blue-600 underline hover:text-blue-800 transition"
              onClick={() => setShowVideo(true)}
            >
              ▶️ Watch Project Video
            </button>
          ) : (
            videoId ? (
              <div className="w-full max-w-[560px] aspect-video mt-4">
                <iframe
                  className="w-full h-full rounded-md shadow-md"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube Video"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-red-500">Invalid YouTube URL</p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Portfolio1;
