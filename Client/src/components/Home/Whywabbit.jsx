import React from 'react'
import img1 from '../../assets/Home/img001.svg'
import img2 from "../../assets/Home/WhyWabbit/Hiring-removebg-preview.svg"
import img3 from "../../assets/Home/WhyWabbit/sale.png"
import img from "../../assets/Home/WhyWabbit/img.jpg"

export default function Whywabbit() {
  return (
    <div className='w-screen h-[100vh] flex items-center justify-center'>

      <div className=' lg:h-[100%] xl:h-auto w-[90%] rounded-3xl flex max-sm:flex-col overflow-hidden bg-Thirdbg '>

        {/* Text-Div */}

        <div className=' w-[60%] max-lg:w-[100%]'>

          {/* Heading-Div */}

          <div className='max-lg:text-center'>
            <h1 className='text-white  font-bold max-sm:text-[25px] pt-3 md:text-[50px] lg:pl-7 '>
              The right partnerships
            </h1>

            <h1 className='text-Secbg font-bold  text-[24px]  md:text-[45px]  lg:text-[40px] lg:pl-8'>
              elevate good companies
            </h1>

            <h1 className='text-Secbg font-bold  text-center max-sm:text-[25px] sm:text-[40px] lg:text-start lg:ml-8'>
              to greatness.
            </h1>

          </div>

          {/* Secheading-Div */}

          <div className='text-white mt-3 max-lg:pl-4'>
            <p className='font-nunito text-[18px] lg:text-[22px] md:px-5'>
              Access the top 1% of talent on <span className='text-maincolor font-extrabold'>wabbit</span>, with the complete suite of hybrid workforce management tools.This is how innovation happens today.
            </p>
          </div>


          <div className='list-none flex mt-2'>
            <img
              src={img1}
              alt=""
              className="h-[5%] w-[5%] object-contain ml-6 mt-3"
            />
            <p className='text-[16px] pt-3 sm:text-[25px] lg:text-[20px]  text-white font-nunito pl-2 lg:pl-2  xl:pt-5'>
              Elevate your e-commerce game with Wabbit.
            </p>
          </div>

          <div className='list-none flex mt-4'>
            <img
              src={img2}
              alt=""
              className="h-[5%] w-[5%] mt-5 object-contain ml-5"
            />
            <p className='text-[16px] pt-1 sm:text-[25px] lg:text-[20px]  text-white font-nunito pl-2 lg:pl-2 xl:pt-5'>
              Control every step: hire, classify, and pay your talent efficiently.
            </p>
          </div>

          <div className='list-none flex mt-5'>
            <img
              src={img3}
              alt=""
              className="h-[6%] w-[6%] object-contain ml-5"
            />
            <p className='text-[15px] sm:text-[25px] lg:text-[20px] text-white font-nunito pl-2 lg:pl-4 pt-2'>
              With <span className='text-maincolor font-extrabold'>Wabbit</span>, experience total support from start to finish.

            </p>
          </div>

          <button className='mx-6 my-11 h-[40px] w-[120px] bg-white text-maincolor rounded-lg text-[18px] font-semibold lg:mx-[70px]'>
            Get details
          </button>

        </div>

        {/* Img-Div */}

        <div className='w-[40%]  max-lg:hidden bg-Thirdbg'>
          <img src={img} alt="img" className='h-[100%] w-[90%] lg:h-[100%]  object-contain'/>
        </div>
      </div>
    </div>

  )
}
