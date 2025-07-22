import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/Home/Nav/navlogo.png";
import { Mycontext } from "../../../context/Mycontext";
import { Link, useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";
import LoginStepModal from "../../Auth/Register Steps/RegisterInfoModal";

const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("username");
  const usertype = localStorage.getItem("accountType");

  const {
    setIsnavbar,
    createAccount,
    setcreateAccount,
    setLoginStep,
    setRegisterStep,
    newModal,
    setnewModal,
    setRegisterEmail,
    setRegisterUsername,
    setRegisterPassword,
    isModal, setIsModal, setUserData
  } = useContext(Mycontext);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (isModal || newModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModal, newModal]);

  const handleClickAway2=()=>{
    setprofile(false)
  }

  const handleClickAway = () => {
    setRegisterEmail("");
    setRegisterUsername("");
    setRegisterPassword("");
    setIsModal(false);
    setRegisterStep(0);
    setcreateAccount(false);
    setLoginStep(0);
    setUserData({
      freelancerType: "",
      freelancingPurpose: [],
      companySize: "",
      purpose: "",
      sellingPurpose: "",
      experienceMode: "",
    })
    setnewModal(false);
  };

  const handleSideModalClose = () => {
    setSideModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setSideModal(false);
  };

  return (
    <div className="bg-white h-[70px] text-black flex items-center flex-row md:px-[30px] fixed top-0 w-[100%] z-20">
      <div className="w-[20%] flex items-center justify-center h-full md:hidden">
        <i
          className="fa-solid fa-bars text-[25px]"
          onClick={() => setIsnavbar((prevState) => !prevState)}
        ></i>
      </div>

      {/* Logo Section */}
      <div className="w-[55%] flex items-center justify-center text-black h-full md:w-[25%] md:items-start md:justify-start">
        <img
          className="w-[150px] md:w-[160px] mt-[10px] cursor-pointer"
          src={logo}
          alt="Logo"
        />
      </div>

      {/* Conditional Navbar */}
    
        <div className="h-full flex items-center md:w-[85%] justify-end">
          {/* Seller-specific Nav Items */}
          <nav className="hidden md:flex flex-row items-center w-[64%] h-[100%] gap-[4%] lg:justify-evenly">
            <Link
              className="list-none text-2xl font-semibold md:text-xl hover:text-hovercolor cursor-pointer transition"
              to="/"
            >
              Home
            </Link>
            <Link
              className="list-none text-2xl font-semibold md:text-xl hover:text-hovercolor cursor-pointer transition"
              to="/about"
            >
              About
            </Link>
            <li className="list-none text-2xl font-semibold md:text-xl hover:text-hovercolor cursor-pointer transition">
              Monetize Your Skill
            </li>
          </nav>

          
            <button
              className="text-nowrap w-[95%] px-4 py-2 border-[1px] flex items-center justify-center sm:left-[0px] sm:text-lg bg-black text-white text-[17px] font-[500] rounded-xl md:w-[150px]"
              onClick={() => setIsModal(true)}
            >
              Get Started
            </button>
        </div>

      {/* Modal for Login/Register */}
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-[90vw] md:w-[80vw] lg:w-[600px] xl:w-[550px] bg-white h-[85vh] rounded-2xl flex flex-col overflow-hidden relative z-60">
              {createAccount ? <Register /> : <Login onLoginSuccess={handleLoginSuccess} />}
            </div>
          </ClickAwayListener>
        </div>
      )}

      {/* Modal for Login Steps */}
      {newModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-[90vw] md:w-[80vw] lg:w-[600px] xl:w-[850px] bg-white h-[85vh] rounded-2xl flex flex-col overflow-hidden relative z-60">
              <LoginStepModal />
            </div>
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};

export default Navbar;
