import { useEffect, useState } from "react";
import axios from "axios";

export default function FreelancerPortfolio() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/all");
        setProfiles(response.data.data);
      } catch (err) {
        console.error("Error fetching profiles 🔴:", err);
        setError("Failed to load profiles");
      }
    };

    fetchProfiles();
  }, []);

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
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4 text-center lg:text-left">User Profiles</h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full border border-gray-300 text-sm lg:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-left">First Name</th>
              <th className="p-2 border text-left">Last Name</th>
              <th className="p-2 border text-left">Email</th>
              <th className="p-2 border text-left">City</th>
              <th className="p-2 border text-center">Check</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile._id} className="text-center hover:bg-gray-50">
                <td className="p-2 border text-left">{profile.firstname}</td>
                <td className="p-2 border text-left">{profile.lastname}</td>
                <td className="p-2 border text-left">{profile.email}</td>
                <td className="p-2 border text-left">{profile.city}</td>
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
    </div>
  );
}
