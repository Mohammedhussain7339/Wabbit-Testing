import React, { useContext, useState } from "react";
import { Mycontext } from "../../../context/Mycontext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterStep2 = () => {
  const {
    setRegisterStep,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    registerUsername,
    setRegisterUsername,
    setIsModal,
    setnewModal,
  } = useContext(Mycontext);

  const [isChecking, setIsChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  // Function to check if username is unique
  const checkUsername = async () => {
    if (!registerUsername.trim()) {
      toast.warning("Username cannot be empty! ⚠️");
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(
        `https://wabbit-backend.onrender.com/auth/check-username/${registerUsername}`
      );

      if (!response.ok) {
        throw new Error("Failed to check username");
      }

      const data = await response.json();

      if (!data.available) {
        
        setUsernameAvailable(false);
        toast.error("Username is already taken! ❌");

      } else {
        setUsernameAvailable(true);
        toast.success("Username is available! ✅");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      toast.error("Something went wrong while checking username.");
    }
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col gap-3 h-[100%]">
      <div className="absolute top-6">
        <button
          className="text-start font-bold text-sm flex gap-2 flex-row items-center justify-start"
          onClick={() => setRegisterStep(1)}
        >
          <FaArrowLeftLong />
          Back
        </button>
      </div>

      <form className="h-[85%] flex flex-col gap-3">
        <div className="text-[22px] md:text-3xl text-start font-nunito font-bold">
          Get your profile started
        </div>
        <div className="text-[16px] text-gray-600">
          Add a unique username. This is how you'll appear to others.
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <label htmlFor="username" className="font-bold w-fit">
            Choose a username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
                onBlur={checkUsername} // Check username when input loses focus
              className={`border rounded-lg py-2 px-3 pr-10 border-gray-300 w-full focus:outline-gray-500 
                ${usernameAvailable === false ? "border-red-500" : ""}
                ${usernameAvailable === true ? "border-green-500" : ""}`
              }
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsModal(false);
            setnewModal(true);
            toast.success("Proceeding to the next step 🚀");
          }}
          disabled={
            !registerEmail || !registerPassword || !registerUsername || usernameAvailable === false
          }
          type="submit"
          className="py-3 text-center w-full cursor-pointer border rounded-xl border-gray-300 font-bold flex items-center justify-center bg-black mt-6"
        >
          <p className="text-[16px] text-white">Continue</p>
        </button>
      </form>
    </div>
  );
};

export default RegisterStep2;
