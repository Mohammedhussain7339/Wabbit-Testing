import React, { useContext, useEffect } from 'react'
import { Mycontext } from '../context/Mycontext'
import Navbar from "../components/Home/Navbar/Navbar"
import MobileNav from '../components/Home/Navbar/Mobilenav'
import FindFreelance from '../components/Home/FindFreelance'
import Category from '../components/Home/Category'
import Topeditors from '../components/Home/Topeditors'
import BusinessesSlide from '../components/Home/BusinessesSlide'
import Whywabbit from '../components/Home/Whywabbit'
import FreelancersSlide from '../components/Home/FreelancersSlide'
import Fordesigner from '../components/Home/Fordesigner'
import Footer from '../components/Home/Footer'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const { isnavbar, ispeofile, setprofile } = useContext(Mycontext);
    const navigate = useNavigate();
    const accountType = localStorage.getItem('userType');
    
    useEffect(() => {
        if (accountType === 'Selling') {
            navigate('/onboardingseller')
        }
    }, [])

    return (
        <div className='flex flex-col h-auto justify-between'>
            <Navbar />
            {isnavbar && <MobileNav />}
            <FindFreelance />
            <Category />
            <Topeditors />
            <BusinessesSlide />
            <Whywabbit />
            <FreelancersSlide />
            <Fordesigner />
            <Footer />
        </div>
    )
}
