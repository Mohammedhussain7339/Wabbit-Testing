import { useEffect, useState } from "react";
import axios from "axios";

function Profileget({index,setIndex}) {
  const profileId = localStorage.getItem("profileId");
  console.log(profileId)
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!profileId) return;
  
    axios.get(`https://wabbit-backend.onrender.com/api/normaluser?id=${profileId}`)
      .then(response => {
        console.log(response.data); // Check the structure of response
        setProfile(response.data.profile); // Extract `profile` from response
      })
      .catch(error => {
        console.error("Error fetching profile:", error.response?.data || error.message);
      });
  }, [profileId]);

  const updateHandler= ()=>{
    setIndex(false);
    console.log(index)
    
  }

    return (
<div>
  <div className="w-[80%] justify-center flex p-1 ">
    <div>
      {profile ? (
        <div>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" className="w-full border p-2 rounded-md h-[50px]" value={profile.fullName} />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full border p-2 rounded-md mt-1 h-[50px]" value={profile.email} />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input type="tel" className="w-full border p-2 rounded-md mt-1 h-[50px]" value={profile.phoneNo}/>
          </div>

          {/* Gender Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex gap-3 mt-2 h-[50px] rounded-md items-center justify-center bg-green-500"><p>{profile.gender}</p></div>
          </div>

          <div className="flex gap-3 flex-wrap w-full]">
            <input type="text" placeholder="Company Name" className="border p-2 rounded-md mt-2 w-[100%] h-[50px]" value={profile.companyName}  />
            <input type="text" placeholder="Company GST" className="border p-2 rounded-md mt-2 w-[100%] h-[50px]" value={profile.companyGST} />
            <div className="flex gap-3 flex-wrap">
              <input type="text" placeholder="Address 1" className="border p-2 rounded-md mt-2 w-[285px] h-[50px]" value={profile.address.address1} />
              <input type="text" placeholder="Address 2" className="border p-2 rounded-md mt-2 w-[283px] h-[50px]" value={profile.address.address2} />
              <input type="text" placeholder="Pincode" className="border p-2 rounded-md mt-2 w-[283px] h-[50px]" value={profile.address.pincode} />
              <input type="text" placeholder="City" className="border p-2 rounded-md mt-2 w-[285px] h-[50px]" value={profile.address.city} />
              <input type="text" placeholder="State" className="border p-2 rounded-md mt-2 w-[283px] h-[50px]" value={profile.address.state} />
              <input type="text" placeholder="Country" className="border p-2 rounded-md mt-2 w-[283px] h-[50px]" value={profile.address.country} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-4" onClick={updateHandler}>Update</button>
    </div>
  </div>
</div>

            
  );
}

export default Profileget;
