import { useState } from "react";
import axios from "axios";
import Profileget from "./profile/Profileget";


function Profiles() {
  const userId = localStorage.getItem("_id");
  const profileId = localStorage.getItem("profileId")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    gender: "",
    hasCompany: null,
    companyName: "",
    companyGST: "",
    address: {
      address1: "",
      address2: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleGenderChange = (selectedGender) => {
    console.log("Selected Gender:", selectedGender); // Print gender in console
    setFormData({ ...formData, gender: selectedGender });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, userId };

    try {
      const response = await axios.post("https://wabbit-backend.onrender.com/api/normaluser", payload);

        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("profileId", response.data.profile_id);
          console.log("Profile ID saved to localStorage:", response.data.profile_id);
          if(profileId){
          alert("User Data Successfully Update")
          }
          else{
          alert("User Registered Successfully!");}
          setIndex(true)
        } else {
            alert("Unexpected response from server.");
        }
    } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        alert(`Error registering user: ${error.response?.data?.error || "Unknown error"}`);
    }
};
  const [index, setIndex] = useState(true)

  return (
    <>
      {profileId && index == true ? <Profileget index={index} setIndex={setIndex} >
      </Profileget> :

    <div className=" max-md:w-[100vw]  h-full w-[81vw] flex bg-bgmain">

      {/* <div className='w-[30%]'></div> */}
        <div>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md h-[50px]"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1 h-[50px]"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium ">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1 h-[50px]"
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex gap-3 mt-2 ">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  type="button"
                  key={g}
                  className={`px-4 w-[250px] py-2 rounded-md border-gray-400 border-1 border  ${
                    formData.gender === g
                      ? "bg-green-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleGenderChange(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Do you have a company? */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Do you have a company?
            </label>
            <div className="flex gap-3 mt-2 ">
              <button
                type="button"
                className={`px-4 py-2 rounded-md border border-gray-400 border-1 w-[300px] ${
                  formData.hasCompany === true
                    ? "bg-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setFormData({ ...formData, hasCompany: true })}>
                Yes
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md border border-gray-400 border-1 w-[300px] ${
                  formData.hasCompany === false
                    ? "bg-red-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setFormData({ ...formData, hasCompany: false })}>
                No
              </button>
            </div>
          </div>

          {/* Company Details (if Yes) */}
          {formData.hasCompany && (
            <div className="flex gap-3 flex-wrap w-[865px] bg-blue-100">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                className=" border p-2 rounded-md mt-2 w-[100%] h-[50px]"
              />
              <input
                type="text"
                name="companyGST"
                placeholder="Company GST"
                onChange={handleChange}
                className=" border p-2 rounded-md mt-2 w-[100%] h-[50px]"
              />
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  name="address1"
                  placeholder="Address 1"
                  onChange={handleAddressChange}
                  className=" border p-2 rounded-md mt-2 w-[250px] h-[50px]"
                />
                <input
                  type="text"
                  name="address2"
                  placeholder="Address 2"
                  onChange={handleAddressChange}
                  className=" border p-2 rounded-md mt-2 w-[250px] h-[50px]"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  onChange={handleAddressChange}
                  className=" border p-2 rounded-md mt-2 w-[250px] h-[50px]"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleAddressChange}
                  className=" border p-2 rounded-md mt-2 w-[250px] h-[50px]"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleAddressChange}
                  className=" border p-2 rounded-md mt-2 w-[250px] h-[50px]"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  onChange={handleAddressChange}
                  className=" border p-2 rounded-md mt-2 w-[250px] h-[50px]"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4">
            Submit
          </button>
        </div>
    </div>}
        </>

  );
}

export default Profiles;
