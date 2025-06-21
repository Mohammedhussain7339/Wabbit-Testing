import React from 'react';
import img from '../../assets/Seller/seller.png';

export default function HelpSupport() {
    return (
        <div className='max-md:w-[100vw] h-[80vh] w-[81vw] flex justify-center items-center'>

            <div className='max-md:w-[91vw] h-[47vh] w-[62vw] flex bg-bgmain  rounded-2xl overflow-hidden'>

                <div className='max-md:flex max-md:flex-col max-md:w-[100%] h-full w-[55%]'>

                    <div className='max-md:w-[100%] max-md:h-[50%] h-[50%] flex flex-col items-center justify-center'>

                        <h1 className='max-md:pt-14  max-md:text-[25px] pt-20 px-20 font-nunito font-extrabold text-[45px] -rotate-3'>
                            Need help?
                        </h1>

                        <h2 className='max-md:text-[25px] max-md:px-10 text-center pt-1 px-20 font-bold text-[25px] -rotate-2'>
                            We're here for you.
                        </h2>
                    </div>


                    <div className='max-md:w-[100%] max-md:h-[50%] h-[50%] flex  items-center justify-center gap-12'>
                        {/* Email Us Button */}
                        <a
                            href="mailto:Support@wabbit.in"
                            className='bg-maincolor h-[50px] w-[130px] rounded-xl text-white ml-5 text-[20px] font-bold flex items-center justify-center'
                        >
                            Email Us
                        </a>

                        {/* Call Us Button */}
                        <a
                            href="tel:+917340112746"
                            className='bg-maincolor h-[50px] w-[130px] rounded-xl text-white text-[20px] font-bold flex items-center justify-center'
                        >
                            Call Us
                        </a>
                    </div>
                </div>

                <div className='max-md:hidden w-[45%] pt-16'>
                    <img
                        className='h-[100%] w-[50vw] object-cover'
                        src={img}
                        alt="Support Illustration"
                    />
                </div>
            </div>
        </div>
    );
}
