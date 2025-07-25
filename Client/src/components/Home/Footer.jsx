import React from "react";
import logo from "../../assets/Home/Nav/navlogo.png";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaYoutube,FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  const suggestions = [
  { label: "Video Editor", link: "/videoeditor" },
  { label: "Photo Editor", link: "/photocard" },
  { label: "Canva Expert", link: "/canvacard" },
  { label: "Invitation Expert", link: "/invititioncard" },
  { label: "Web Developer", link: "/webdeveloper" },
  { label: "UI/UX Designer", link: "/uiux" },
  { label: "Mockup", link: "/mockup" },
  { label: "Graphic Designer", link: "/graphicdesigner" },

];

  return (
    <div className="bg-black text-white font-nunito cursor-pointer">
      <div className="flex flex-wrap gap-6 items-start justify-center p-8 w-full">
        {/* Category Section */}
{/* Category Section */}
<div className="flex w-[300px] flex-col px-[50px] text-base sm:text-lg md:text-xl lg:text-2xl">
  <ul className="space-y-1">
    <li className="font-bold text-white mb-1">Category</li>
    {suggestions.map((item, index) => (
      <li key={index}>
        <Link to={item.link} className="hover:underline text-white">
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</div>


        {/* For Client and Freelancer Section */}
        <div className="flex  w-[300px] flex-col items-center px-[50px] text-base sm:text-lg md:text-xl lg:text-2xl">
          <ul className="space-y-1">
            <li><strong>For Client</strong></li>
            <li>Find Freelancer</li>
            <li>Helpdesk for Client</li>
            <li><strong>For Freelancer</strong></li>
            <li className="text-[17px]">Become a Wabbit Freelancer</li>
            <Link className="text-[17px]" to='/Joinagency'>Join as an Agency</Link>
            <li className="text-[17px]">Helpdesk for Freelancer</li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="flex w-[300px] flex-col px-[50px] text-base sm:text-lg md:text-xl lg:text-2xl">
          <ul className="space-y-1">
            <li><strong>Help</strong></li>
            <li>About</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Logo and Social Media Icons Section */}
        <div className="w-[270px] p-[20px] flex flex-col items-center justify-center">
          <div>
            <img className="" src={logo} alt="Logo" />
          </div>

          <div className="flex text-2xl gap-5 cursor-pointer mt-4">
            <i className="transition-all duration-300 ease-in-out hover:text-blue-500">
              <Link to="https://www.linkedin.com/company/wabbit-india/?viewAsMember=true">              <FaLinkedinIn /></Link>
            </i>
            <i className="transition-all duration-300 ease-in-out hover:text-red-500">
              <FaYoutube />
            </i>
            <i className="transition-all duration-300 ease-in-out hover:text-blue-700">
              <Link to="https://wa.link/3kgggn"><FaWhatsapp/></Link>
            </i>
            <i className="transition-all duration-300 ease-in-out hover:text-gray-500">
              <Link to="https://x.com/Wabbit_in"><FaXTwitter /></Link>
            </i>
            <i className="transition-all duration-300 ease-in-out hover:text-pink-500">
             <Link to="https://www.instagram.com/wabbit.in/"> <FaInstagram /></Link>
            </i>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-sm sm:text-base md:text-lg lg:text-xl">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
}
