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
  const [sideModal, setSideModal] = useState(false);

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
      {/* three dot container */}
      <div className="w-[20%] flex items-center justify-center h-full md:hidden">
        <i
          className="fa-solid fa-bars text-[25px]"
          onClick={() => {
            setIsnavbar((prevState) => !prevState);
          }}
        ></i>
      </div>

      {/* logo container */}
      <div className="w-[55%] flex items-center justify-center text-black h-full md:w-[25%] md:items-start md:justify-start">
        <img
          className="w-[150px] md:w-[160px] mt-[10px] cursor-pointer"
          src={logo}
          alt=""
        />
      </div>

      {/* Normal User Navbar */}

      {/* Nav Lists container */}
      <div className="w-auto h-full flex items-center justify-end md:w-[85%] gap-[11%]">
        <div className="hidden md:flex flex-row items-center h-[100%] justify-between gap-[9%]">
          <Link
            className="list-none text-2xl text-nowrap font-semibold md:text-xl hover:text-hovercolor hover:cursor-pointer transition ease-in"
            to="/"
          >
            Home
          </Link>
          <Link
            className="list-none text-2xl text-nowrap font-semibold md:text-xl hover:text-hovercolor hover:cursor-pointer transition-all"
            to="/about"
          >
            About
          </Link>

          <li className="list-none text-2xl text-nowrap font-semibold md:text-xl hover:text-hovercolor hover:cursor-pointer transition-all">
            Monetize Your Skill
          </li>
        </div>

        {!token ? (
          <button
            className="text-nowrap  w-[95%] px-4 py-2 border-[1px] flex items-center justify-center sm:left-[0px]  sm:text-lg 320:relative right-1 320:text-sm bg-black text-white text-[17px] font-[500] rounded-xl md:w-[150px]"
            onClick={() => {
              setIsModal(true);
            }}
          >
            Get Started
          </button>
        ) : (
          <button
            className="bg-maincolor rounded-full w-[40px] h-[40px] text-white text-center uppercase font-bold ml-8"
            onClick={() => {
              setSideModal(true);
            }}
          >
            {name[0]}
          </button>
        )}
      </div>

      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-[90vw] md:w-[80vw] lg:w-[600px] xl:w-[550px] bg-white h-[85vh] rounded-2xl flex flex-row overflow-hidden relative z-60">
              <div className="w-[100%] xl:w-[100%] h-full flex flex-col items-center justify-center">
                {createAccount ? <Register /> : <Login />}
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}

      {newModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-[90vw] md:w-[80vw] lg:w-[600px] xl:w-[850px] bg-white h-[85vh] rounded-2xl flex flex-row overflow-hidden relative z-60">
              {/* LoginStepModal content goes here */}
              <LoginStepModal />
            </div>
          </ClickAwayListener>
        </div>
      )}

      {sideModal && (
        <ClickAwayListener onClickAway={handleSideModalClose}>
          <div className="fixed top-[70px] right-0 w-[250px] bg-white shadow-lg rounded-lg z-50">
            <ul className="p-4">
              <li
                className="text-lg font-medium py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setSideModal(false);
                }}
              >
                Profile
              </li>

              <li
                className="text-lg font-medium py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      )}

      {/* for Seller */}'


      {/* <div className="w-auto h-full flex items-center justify-end md:w-[85%] gap-[11%]">
        <div className="hidden md:flex flex-row items-center h-[100%] justify-between gap-[9%]">

          <li className="list-none text-3xl text-nowrap font-semibold md:text-xl hover:text-hovercolor hover:cursor-pointer transition-all">
            Notification
          </li>
        </div>

        <button
          className="text-nowrap  mr-[150px] w-[100%] px-4 py-2 flex items-center justify-center sm:left-[0px]  sm:text-lg 320:relative right-1 320:text-sm bg-maincolor text-white text-[30px] font-[500] rounded-xl md:w-[150px]"
        >
          Switch to Buyer
        </button>

      </div>


      {
        sideModal && (

          <ClickAwayListener onClickAway={handleSideModalClose}>

            <div className="fixed top-[70px] right-0 w-[250px] bg-white shadow-lg rounded-lg z-50">
              <ul className="p-4">
                <li
                  className="text-lg font-medium py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}

                >
                  NO
                </li>

                <li
                  className="text-lg font-medium py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}

                >
                  YES
                </li>


              </ul>
            </div>
          </ClickAwayListener>

        )
      } */}


    </div>
  );
};

export default Navbar;
