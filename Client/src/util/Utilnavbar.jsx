import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/Home/Nav/navlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Mycontext } from "../context/Mycontext";


const Navbar = () => {
  const username=localStorage.getItem('username')
  const navigate = useNavigate();
  const name = localStorage.getItem("username");
  const usertype = localStorage.getItem("accountType");
  const token = localStorage.getItem("token");
  const{ setIsutilnavbar} =useContext(Mycontext)
  
  return (
    <div className="bg-white h-[70px] text-black flex items-center flex-row md:px-[30px] fixed top-0 w-[100%] z-20">
      <div className="w-[20%] flex items-center justify-center h-full md:hidden">
        <i
          className="fa-solid fa-bars text-[25px]"
          onClick={() =>  setIsutilnavbar((prevState) => !prevState)}
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

      
        <div className="w-full flex items-center justify-end gap-10">

          <nav className="hidden md:flex h-[100%] gap-[1%]">
            <li className="list-none text-3xl text-nowrap font-semibold md:text-xl hover:text-hovercolor hover:cursor-pointer transition-all">
              Notification
            </li>
          </nav>

          <button
            className="bg-maincolor rounded-full w-[45px] h-[45px] text-white text-center uppercase font-bold text-[25px] mr-4"
          >
            {username[0]}
          </button>
          
        </div>
    </div>
  );
};

export default Navbar;