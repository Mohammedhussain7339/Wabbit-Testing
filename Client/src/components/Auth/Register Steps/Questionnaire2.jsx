import React, { useContext, useState } from "react";
import { questionsData2 } from "../utils/ClientData";
import { Mycontext } from "../../../context/Mycontext";
import greatDesign from "../../../assets/Auth/For Freelancer/4th - Modal/greatDesign.png";
import { useNavigate } from "react-router";

const Questionnaire2 = ({ goBackToModal }) => {
  const navigate = useNavigate();
  const {
    userData,
    setUserData,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    registerUsername,
    setRegisterUsername,
    setRegisterStep,
    setIsModal,
    setcreateAccount,
    setLoginStep,
    setnewModal,
  } = useContext(Mycontext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); // Track completion

  const currentQuestion = questionsData2[currentQuestionIndex];
  const fieldMap = ["sellingPurpose", "experienceMode"];

  const handleOptionSelect = (selectedOption) => {
    const fieldName = fieldMap[currentQuestionIndex];
    setUserData((prevState) => ({
      ...prevState,
      [fieldName]: selectedOption,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData2.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsCompleted(true); // Mark as completed after the last question
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      const fieldName = fieldMap[currentQuestionIndex];
      setUserData((prevState) => ({
        ...prevState,
        [fieldName]: "",
      }));
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      goBackToModal();
    }
  };

  const isNextEnabled =
    (currentQuestionIndex === 0 && userData.sellingPurpose) ||
    (currentQuestionIndex === 1 && userData.experienceMode);

  const isSelected = (option) => {
    if (currentQuestionIndex === 0) {
      return userData.sellingPurpose === option;
    }
    if (currentQuestionIndex === 1) {
      return userData.experienceMode === option;
    }
    return false;
  };

  // Register the user using the API
  const registerUser = async () => {
    try {
      // Ensure freelancerType is either "Selling" or "Buying"
      const freelancerType = userData.freelancerType || "Buying"; // Default to "Buying" if not set
  
      // Log the user data to ensure all required fields are included
      console.log("Registering with data:", {
        email: registerEmail,
        password: registerPassword,
        username: registerUsername,
        freelancerType,
        experienceMode: userData.experienceMode,
        sellingPurpose: userData.sellingPurpose,
        freelancingPurpose: userData.freelancingPurpose,
        companySize: userData.companySize,
        purpose: userData.purpose
      });
  
      const response = await fetch("https://wabbit-backend.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
          username: registerUsername,
          freelancerType, // Send freelancerType (either "Selling" or "Buying")
          experienceMode: userData.experienceMode,
          sellingPurpose: userData.sellingPurpose,
          freelancingPurpose: userData.freelancingPurpose || [], // Default to empty array if not set
          companySize: userData.companySize || "", // Default to empty string if not set
          purpose: userData.purpose || "", // Default to empty string if not set
        }),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (result.authToken) {
        const token = result.authToken;
        localStorage.setItem("token", token);
        localStorage.setItem("_id", result._id);
        localStorage.setItem("username", result.username);
        localStorage.setItem("accountType", result.accountType);
  
        // Reset the context values
        setRegisterStep(0);
        setcreateAccount(false);
        setLoginStep(0);
        setUserData({
          sellingPurpose: "",
          experienceMode: "",
          freelancingPurpose: [],
          companySize: "",
          purpose: ""
        }); // Properly reset userData
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterUsername("");
        setIsCompleted(false);
        setIsModal(false); // Close modal
        setnewModal(false); // Close any other modals
        navigate("/onboardingseller");
        // Optionally, navigate to the user info page or perform other actions
      }
    } catch (error) {
      console.log("An error occurred in registering:", error);
    }
  };
  
  if (isCompleted) {
    return (
      <div className="w-full h-full flex items-center justify-evenly flex-col relative p-5 gap-5">
        <img
          src={greatDesign}
          className=" w-[300px]  h-[300px] object-contain "
          alt="lastimg"
        />
        <div className="text-xl lg:text-3xl font-semibold  ">
          Great, you're almost there. Here's what's next:
        </div>
        <div className=" flex-col flex lg:flex-row items-center justify-center gap-5">
          <button
            className="py-2 bg-black  px-8 text-white rounded-lg text-sm md:text-base hover:bg-opacity-70"
            onClick={() => console.log("Complete Seller Profile Clicked")}
          >
            Complete Seller Profile
          </button>
          <button
            className="px-8 py-2 bg-white text-black border-2 rounded-lg text-sm md:text-base"
            onClick={() => registerUser()}
          >
            Start Exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-10 px-6 md:px-14 gap-5 overflow-y-scroll">
      <p className="text-lg md:text-2xl text-center font-semibold font-nunito">
        {currentQuestion.question}
      </p>
      {currentQuestion.subtitle && (
        <p className="text-sm md:text-xl text-gray-500 font-semibold">
          {currentQuestion.subtitle}
        </p>
      )}
      <div className="flex flex-col md:flex-row w-full gap-3 items-center px-2 md:px-4 flex-grow justify-evenly py-2 overflow-y-scroll">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(option.label)}
            className={`w-full border md:w-[48%] h-[40%] md:h-[60%] rounded-lg p-4 flex items-center justify-center text-center transition-all relative ${
              isSelected(option.label)
                ? "border-maincolor bg-maincolor/10 shadow-lg"
                : "border-gray-300"
            }`}
            aria-selected={isSelected(option.label)}
          >
            <img
              src={option.icon}
              alt={option.label}
              className="absolute w-20 h-20 md:w-[50%] md:h-[50%] object-contain mb-2 md:top-5 md:left-5"
            />
            <p className="absolute bottom-2 left-2 text-gray-700 font-semibold text-sm md:text-base">
              {option.label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <button
          className="bg-white text-black px-4 md:px-5 py-2 rounded-lg border text-sm md:text-base"
          onClick={goBack}
        >
          Back
        </button>
        <button
          className={`px-4 md:px-5 py-2 rounded-lg text-white text-sm md:text-base transition duration-200 ${
            isNextEnabled
              ? "bg-maincolor hover:bg-maincolor/90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={goToNextQuestion}
          disabled={!isNextEnabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questionnaire2;
