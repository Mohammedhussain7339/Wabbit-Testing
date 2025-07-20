import React, { useContext } from 'react'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF,FaApple } from "react-icons/fa";
import { Mycontext } from '../../../context/Mycontext';

const Content = () => {
const handleSuccess = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);

  const res = await axios.post("http://localhost:8000/api/google-login", {
    name: decoded.name,
    email: decoded.email,
    googleId: decoded.sub,
    image: decoded.picture,
  });

localStorage.setItem("token", res.data.authToken);
localStorage.setItem("username", res.data.username);
localStorage.setItem("userId", res.data._id);
localStorage.setItem("")

  alert("Login successful");
};
  const username=localStorage.getItem('username');

  const {setcreateAccount, setLoginStep} = useContext(Mycontext)
  return (
    <>
      <div className="flex flex-col  gap-3 h-[20%]">
        <div className="text-[22px] md:text-3xl text-start font-nunito font-bold">
          Sign in to your account
        </div>
        <div className="text-[20px] md:text-xl text-start font-nunito">
          Don’t have an account?
          <span className=" underline underline-offset-2 text-maincolor cursor-pointer" onClick={()=>{setcreateAccount(true)}}>
            Join here
          </span>
        </div>
      </div>

      <div className="h-[60%] flex flex-col overflow-hidden gap-3">
              <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
        <div className="py-2 text-center w-full cursor-pointer border rounded-xl border-[rgb(0,0,0,0.2)] font-bold flex-row flex items-center justify-center gap-[5%]" onClick={()=>{setLoginStep(1)}}>
          <MdEmail className="text-[16px]"/>
          <p className="text-[16px]">Continue With Username/Email</p>
        </div>
       
      </div>

      <div className="w-full h-[20%] text-[12px] ">
      By joining, you agree to the Wabbit <a href="" className="underline">Terms of Service</a> and to occasionally receive emails from us. Please read our <a href="" className="underline">Privacy Policy</a> to learn how we use your personal data.
      </div>
    </>
  )
}

export default Content
