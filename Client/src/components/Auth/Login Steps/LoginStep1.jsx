import React, { useContext, useState } from "react";
import { Mycontext } from "../../../context/Mycontext"; // Import context to manage state globally
import { FaArrowLeftLong } from "react-icons/fa6"; // Import arrow icon for the 'back' button
import { FaRegEye } from "react-icons/fa6"; // Import eye icon for password visibility
import { FaRegEyeSlash } from "react-icons/fa6"; // Import eye-slash icon for hiding password

const LoginStep1 = () => {
  // Use context to manage login steps and modal state
  const { setLoginStep, setIsModal } = useContext(Mycontext);
  const [show, setshow] = useState(false); // State to toggle password visibility
  const [data, setData] = useState(""); // State to manage email/username input
  const [password, setpassword] = useState(""); // State to manage password input
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle the login form submission
  const result = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setLoading(true); // Start loading indicator (if implemented)
    setError(""); // Reset any previous error message

    try {
      // Sending a POST request to the login API with the provided email/username and password
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data, // Email or username
          password: password, // Password
        }),
      });

      // Parse the response to check if login was successful
      const result = await response.json();

      if (result.success) {
        // If login is successful, clear the inputs and save the authentication data to local storage
        setData(""); 
        setpassword("");
        localStorage.setItem("token", result.authToken);
        localStorage.setItem("_id", result._id);
        localStorage.setItem("username", result.username);
        localStorage.setItem("userType", result.accountType);
        localStorage.setItem("profile_id", result.profileId);

  

        setIsModal(false); // Close the modal
        setLoginStep(0); // Reset the login step to 0 (initial step)
      } else {
        // If login failed, show the error message
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred"); // Handle any errors that occurred during the API call
    } finally {
      setLoading(false); // End the loading indicator
    }
  };

  return (
    <div className="flex flex-col gap-3 h-[100%]">
      {/* Back Button */}
      <div className="absolute top-6">
        <button
          className="text-start font-bold text-sm flex gap-2 flex-row items-center justify-start"
          onClick={() => {
            setLoginStep(0); // Go back to the previous step when clicked
          }}
        >
          <FaArrowLeftLong /> {/* Back arrow icon */}
          Back
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={result} className="h-[85%] flex flex-col gap-3">
        <div className="text-[22px] md:text-3xl text-start font-nunito font-bold">
          Continue with your email or username{" "}
        </div>

        {/* Email or Username Input */}
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="font-bold w-fit">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={data} // Controlled input for data (email or username)
            onChange={(e) => {
              setData(e.target.value); // Update the state with input value
            }}
            placeholder="name@email.com"
            className="border rounded-lg py-2 px-3 pr-10 border-[rgb(0,0,0,0.2)] focus:outline-[rgb(0,0,0,0.5)] "
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="font-bold w-fit">
            Password
          </label>
          <div className="relative h-auto">
            <input
              type={show ? "text" : "password"} // Toggle between text and password field based on 'show' state
              id="password"
              placeholder="password"
              value={password} // Controlled input for password
              onChange={(e) => {
                setpassword(e.target.value); // Update the state with password input
              }}
              className="border rounded-lg py-2 px-3 pr-10 border-[rgb(0,0,0,0.2)] w-full focus:outline-[rgb(0,0,0,0.5)]"
            />
            {/* Eye icon to toggle password visibility */}
            {!show ? (
              <FaRegEyeSlash
                className="absolute top-[35%] right-3 cursor-pointer text-lg"
                onClick={() => setshow(true)} // Show password
              />
            ) : (
              <FaRegEye
                className="absolute top-[35%] right-3 cursor-pointer text-lg"
                onClick={() => {
                  setshow(false); // Hide password
                }}
              />
            )}
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-end underline cursor-pointer text-maincolor hover:transition">
          Forgot Password?
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 text-center w-full cursor-pointer border rounded-xl border-[rgb(0,0,0,0.2)] font-bold flex-row flex items-center justify-center gap-[5%] bg-black"
        >
          <p className="text-[16px] text-white">Continue</p>
        </button>
      </form>

      {/* Footer Text with Terms and Privacy Policy */}
      <div className="w-full h-[20%] text-[12px]">
        By joining, you agree to the Wabbit{" "}
        <a href="" className="underline">
          Terms of Service
        </a>{" "}
        and to occasionally receive emails from us. Please read our{" "}
        <a href="" className="underline">
          Privacy Policy
        </a>{" "}
        to learn how we use your personal data.
      </div>
    </div>
  );
};

export default LoginStep1;
