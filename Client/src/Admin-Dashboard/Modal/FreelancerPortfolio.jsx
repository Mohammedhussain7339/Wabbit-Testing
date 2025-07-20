import { useEffect, useState } from "react";
import axios from "axios";
export default function FreelancerPortfolio() {

  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/all");
        setProfiles(response.data.data); // adjust based on your backend's response shape
      } catch (err) {
        console.error("Error fetching profiles 🔴:", err);
        setError("Failed to load profiles");
      }
    };

    fetchProfiles();
  }, []);
  // Toggle switch handler
  const handleToggle = async (id, currentCheck) => {
    try {
      const res = await axios.put("http://localhost:8000/api/updateProfileCheck", {
        id,
        check: !currentCheck,
      });

      if (res.status === 200) {
        setProfiles((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, check: !currentCheck } : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to update check status:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Profiles</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Check</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile._id} className="text-center">
              <td className="p-2 border">{profile.firstname}</td>
              <td className="p-2 border">{profile.lastname}</td>
              <td className="p-2 border">{profile.email}</td>
              <td className="p-2 border">{profile.city}</td>
              <td className="p-2 border">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={profile.check}
                    onChange={() => handleToggle(profile._id, profile.check)}
                  />
                  <div
                    className={`w-11 h-6 rounded-full p-1 transition duration-300 ${
                      profile.check ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        profile.check ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
