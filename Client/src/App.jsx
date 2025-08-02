import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Contextprovider } from '../src/context/Contextprovider';
import Home from './page/Home';
import About from './page/About';
import Freelancedashboard from './page/Freelancedashboard'

{/* Browse professionals by category Route  */ }
import Photocard from './components/Category-Card/Photocard';
import Mockupcard from './components/Category-Card/Mockupcard';
import Logocard from './components/Category-Card/GraphhicDesigner';
import Invititioncard from './components/Category-Card/Invititioncard'
import Videoeditor from './components/Category-Card/Videoeditor';
import Canvacard from './components/Category-Card/Canvacard';
import Webdevloper from './components/Category-Card/Webdevloper';
import UIUX from './components/Category-Card/UIUX';
import Profile from './page/Profile';
import GetProfile from "./components/Buyer/profile/Profileget"
import Portfolio from './components/FreelancerData/Modal/Portfolio1'
import FreelancerMainPage from './components/FreelancerData/FreelancerMainPage';
import Profileget from './components/Seller/Profile/Modals/Profileget';
import AdminPanel from './Admin-Dashboard/AdminPanel';
import MonetizeSkills from './page/MonetizeSkills';
// import PersonalNav from './components/personalinfo/Personalnav';

// import Profileget from '../src/components/Seller/';
function App() {


  return (
    <div className=' h-auto  box-border m-0 p-0 overflow-x-hidden'>
      <Contextprovider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<h1 className='text-[50px] text-black text-center'>404 Not Found</h1>} />

            {/* Normal Routeing */}

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/MonetizeSkills" element={<MonetizeSkills/>}/>
            {/* <Route path="/profile" element={<PersonalNav />} /> */}
            {/* <Route path="/profileget" element={<Profileget />} /> */}
            <Route path='/onboardingseller' element={<Freelancedashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profileget' element={<Profileget />} />
            <Route path="/FreelancerMainPage/:userId" element={<FreelancerMainPage />} />
            <Route path="/AdminPanel" element={< AdminPanel/>} />


            {/* Category Route */}
            <Route path="/getprofile" element={<GetProfile />} />
            <Route path="/photocard" element={<Photocard />} />
            <Route path='/mockup' element={<Mockupcard />} />
            <Route path='/invititioncard' element={<Invititioncard />} />
            <Route path='/graphicdesigner' element={<Logocard />} />
            <Route path='/videoeditor' element={<Videoeditor />} />
            <Route path='/canvacard' element={<Canvacard />} />
            <Route path='/webdeveloper' element={<Webdevloper />} />
            <Route path='/uiux' element={<UIUX />} />


            {/* for after */}

            {/* <Route path='/freelancePortfolio' element={<FreelancePortfolio />} />
            <Route path='/joinagency' element={<Joinagency />} /> */}

          </Routes>
        </BrowserRouter>
      </Contextprovider>
    </div>
  )
}

export default App
