import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAccountBox, MdWork, MdInsertDriveFile, MdMenu, MdClose } from 'react-icons/md';

import Navbar from '../util/Utilnavbar';
import FreelancerData from './Modal/FreelancerData';
import FreelancerPortfolio from './Modal/FreelancerPortfolio';
import SignUp from './Modal/SignUp';
// import Footer from '../util/Utilfooter'; // Make sure this import exists
import Footer from "../components/Home/Footer"

function AdminPanel() {
  const [activeProfile, setActiveProfile] = useState("SignUp");
  const [activeId, setActiveId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Toggle for mobile sidebar

  const navigate = useNavigate();

  const sidebutton = [
    { id: 1, icons: <MdAccountBox />, name: 'SignUp' },
    { id: 2, icons: <MdInsertDriveFile />, name: 'FreelancerData' },
    { id: 3, icons: <MdWork />, name: 'FreelancerPortfolio' },
  ];

  const changeHandler = (id, name) => {
    setActiveId(id);
    setActiveProfile(name);
    setSidebarOpen(false); // auto close on mobile after selection
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className="lg:w-[100vw] bg-bgmain py-14 h-screen flex flex-col sm:flex-row relative">
        <Navbar />

        {/* Hamburger button */}
        <div className="absolute top-4 left-4 sm:hidden z-50">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`z-40 bg-white shadow-lg px-4 py-6 flex flex-col gap-4 items-start w-[250px] h-full transition-all duration-300
          absolute top-0 left-0 sm:relative sm:flex sm:w-[300px]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
          {sidebutton.map((item) => (
            <div
              key={item.id}
              onClick={() => changeHandler(item.id, item.name)}
              className={`cursor-pointer flex items-center gap-3 w-full px-4 py-2 rounded-md transition-all ${
                activeId === item.id
                  ? 'bg-green-400 text-white'
                  : 'hover:bg-green-100 text-gray-800'
              }`}
            >
              <i className="text-2xl">{item.icons}</i>
              <h2 className="text-lg">{item.name}</h2>
            </div>
          ))}

          <div
            onClick={logoutHandler}
            className="mt-auto bg-maincolor hover:bg-red-600 text-white w-full px-4 py-2 rounded-md flex items-center justify-center cursor-pointer transition-all"
          >
            Logout
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col w-full sm:w-2/3">
          <main className="p-4 flex-grow overflow-y-auto sm:mx-8">
            {activeProfile === "SignUp" && <SignUp />}
            {activeProfile === "FreelancerPortfolio" && <FreelancerPortfolio />}
            {activeProfile === "FreelancerData" && <FreelancerData />}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminPanel;
