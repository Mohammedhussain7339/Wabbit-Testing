import React, { useContext, useState } from "react";
import { questionsData } from "../utils/ClientData";
import { Mycontext } from "../../../context/Mycontext";

const Questionnaire = ({ goBackToModal }) => {
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
    setnewModal, // Added to close modal
  } = useContext(Mycontext); // Access context value
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index

  const currentQuestion = questionsData[currentQuestionIndex]; // Current question data

  // Handle option selection logic
  const handleOptionSelect = (selectedOption) => {
    const fieldMap = ["freelancingPurpose", "companySize", "purpose"]; // Map fields to question indices
    const fieldName = fieldMap[currentQuestionIndex];

    setUserData((prevState) => {
      if (currentQuestionIndex === 0) {
        // Multi-select for the first question
        const isSelected = prevState[fieldName].includes(selectedOption);
        const updatedSelection = isSelected
          ? prevState[fieldName].filter((item) => item !== selectedOption)
          : [...prevState[fieldName], selectedOption];
        return { ...prevState, [fieldName]: updatedSelection };
      } else {
        // Single-select for subsequent questions
        return { ...prevState, [fieldName]: selectedOption };
      }
    });
  };

  // Register the user using the API
  const registerUser = async () => {
    try {
      const response = await fetch("https://wabbit-backend.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
          username: registerUsername,
          freelancerType: userData.freelancerType, // Hardcoded for now
          freelancingPurpose: userData.freelancingPurpose, // Send freelancingPurpose from context
          companySize: userData.companySize, // Send companySize from context
          purpose: userData.purpose, // Send purpose from context
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
          freelancingPurpose: [],
          companySize: "",
          purpose: "",
        }); // Properly reset userData
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterUsername("");
        setIsModal(false); // Close modal
        setnewModal(false); // Close any other modals

        // Optionally, navigate to the user info page or perform other actions
      }
    } catch (error) {
      console.log("An error occurred in registering:", error);
    }
  };

  // Navigation handlers
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Register the user when the last question is answered
      registerUser();
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      const fieldMap = ["freelancingPurpose", "companySize", "purpose"]; // Map fields to question indices
      const fieldName = fieldMap[currentQuestionIndex]; // Identify the current field

      // Clear the state data for the current field
      setUserData((prevState) => {
        const updatedState = {
          ...prevState,
          [fieldName]: currentQuestionIndex === 0 ? [] : "", // Reset based on field type
        };
        console.log("Updated State after Back:", updatedState); // Log updated state
        return updatedState;
      });

      // Update the current question index
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      goBackToModal(); // Call the callback to go back to the modal
    }
  };

  // Determine whether the "Next" button should be enabled
  const isNextEnabled =
    (currentQuestionIndex === 0 && userData.freelancingPurpose.length > 0) ||
    (currentQuestionIndex === 1 && userData.companySize) ||
    (currentQuestionIndex === 2 && userData.purpose);

  // Highlight selected options
  const isSelected = (option) => {
    if (currentQuestionIndex === 0) {
      return userData.freelancingPurpose.includes(option);
    }
    if (currentQuestionIndex === 1) {
      return userData.companySize === option;
    }
    if (currentQuestionIndex === 2) {
      return userData.purpose === option;
    }
    return false;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-10 px-6 md:px-14 gap-5 overflow-y-scroll">
      {/* Question Title */}
      <p className="text-lg md:text-2xl text-center font-semibold font-nunito">
        {currentQuestion.question}
      </p>

      {/* Subtitle */}
      {currentQuestion.subtitle && (
        <p className="text-sm md:text-xl text-gray-500 font-semibold">
          {currentQuestion.subtitle}
        </p>
      )}

      {/* Options */}
      <div className="flex flex-col md:flex-row w-full gap-3 items-center px-2 md:px-4 flex-grow justify-evenly py-2 overflow-y-scroll">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(option.label)} // Handle option click
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

      {/* Navigation Buttons */}
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

export default Questionnaire;
