import React, { useContext, useState } from 'react';
import { MdMessage } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { MdSupportAgent, MdNewspaper, MdAccountBox,MdLiveHelp } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

import { Mycontext } from '../context/Mycontext';
import Projects from '../components/Buyer/Project';
import Subscription from '../components/Buyer/Subscription';
import HelpSupport from '../components/Buyer/HelpSupport';
import Utilavbar from '../util/Utilnavbar';
import UtilmobileNav from '../util/Utilmobilenav'
import Profile from "../components/Buyer/profile/profile"
export default function Buyerprofile() {

    const { activeComponent, setActiveComponent, activeId, setActiveId, isutilnavbar} = useContext(Mycontext);

    const sidebutton = [
        { id: 1, icons: <MdAccountBox />, name: 'Profile' },
        { id: 2, icons: <MdMessage />, name: 'Message' },
        { id: 3, icons: <MdNewspaper />, name: 'Projects' },
        { id: 4, icons: <VscPreview />, name: 'Subscription' },
        { id: 5, icons: <MdLiveHelp />, name: 'Help & Support' },
    ];

    const changeHandler = (id) => {
        setActiveId(id);
        setActiveComponent(id)
    };

    const logoutHandler = () => {
        localStorage.clear();
        navigate("/");

    }

    return (
        <>
            <Utilavbar />
            {isutilnavbar && <UtilmobileNav />}


            <div className='overflow-hidden  flex flex-row w-full h-[89.30vh] mt-[85px]'>
                <div className="flex overflow-scroll">

                    <aside className=" w-[300px]  h-auto lg:visible invisible mt-8 shadow-lg flex flex-col gap-3  py-8 items-center">

                        {sidebutton.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => changeHandler(item.id)}
                                className={` cursor-pointer lg:text-2xl text-xl w-[80%] rounded-lg p-2 flex items-center ${activeId === item.id ? 'bg-green-400 ' : null
                                    }`}
                            >
                                <i className='lg:text-3xl text-xl'>{item.icons}</i>
                                <h2 className='pl-6'>{item.name}</h2>
                            </div>
                        ))}

                        <div className='relative top-32 bg-maincolor cursor-pointer lg:text-2xl text-xl w-[80%] rounded-lg p-2 flex items-center  justify-evenly' onClick={logoutHandler}>Logout</div>

                    </aside>
                </div>

                <div className='max-md:w-[100%] w-[81%] overflow-scroll  h-[screen]'>

                    <main className='w-[80%] h-screen '>
                        {activeComponent === 1 ? <Profile /> : null}
                        {/* {activeComponent === 2 ? <Chat /> : null} */}
                        {activeComponent === 3 ? <Projects /> : null}
                        {activeComponent === 4 ? <Subscription /> : null}
                        {activeComponent === 5 ? <HelpSupport /> : null}
                    </main>

                </div>

            </div>
        </>

    )
}
