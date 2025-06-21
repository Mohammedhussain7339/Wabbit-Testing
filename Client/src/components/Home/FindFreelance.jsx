import React from 'react'
import img1 from '../../assets/Home/FindFreelance/img01.png'
import img2 from '../../assets/Home/FindFreelance/img02.png'
import img3 from '../../assets/Home/FindFreelance/img03.png'
import img4 from '../../assets/Home/FindFreelance/img04.png'
import lino from '../../assets/Home/Brand/lino.svg'
import timex from '../../assets/Home/Brand/timex.svg'

export default function Workwithus() {
  const Brand = [
    { image: lino, altText: "lino" },
    { image: timex, altText: "timex" },
    // { image: star, altText: "logo designer"},
  ];

  return (
    <div className='w-full h-[80vh] mt-[100px] cursor-pointer flex justify-center items-center z-10'>

      <div className='max-sm:w-[100%]  max-md:h-[80%] max-md:mt-[-50px] w-[90%] h-[95%] rounded-2xl  flex flex-col items-center relative bg-bgmain overflow-hidden'>

        {/* Star-Img */}

        <img
          src={img1}
          alt="img01"
          className='max-sm:hidden  absolute object-cover  md:h-24 md:left-2 md:top-3 xl:h-32 xl:left-10'
        />

        <img
          src={img2}
          alt="img2"
          className='max-sm:hidden absolute object-cover md:h-28 md:-left-9 md:bottom-28 xl:h-36 xl:-left-9 xl:bottom-32'
        />

        <img
          src={img3}
          alt="img2"
          className='max-sm:hidden absolute  object-cover md:h-52 md:right-3 md:bottom-24 xl:h-80 xl:right-8 xl:bottom-20'
        />

        <img
          src={img4}
          alt="img2"
          className='max-sm:hidden absolute -rotate-45 object-cover md:h-24 md:left-[40%] md:bottom-32 xl:h-32 xl:left-[45%] xl:bottom-[140px]'
        />


        {/* Heading Dev */}

        <h1 className=' pt-3 font-nunito font-bold text-[50px] max-lg:text-[23px] max-md:pt-10 xl:text-[50px]'>
          Instantly Connect with the Perfect
        </h1>

        <div className='flex gap-2 pt-1 sm:gap-6 max-md:pt-4'>

          <h2 className='text-maincolor font-[900]  font-nunito text-[50px] max-lg:text-[23px]'>
            Freelance
          </h2>

          <h2 className='font-nunito font-bold text-[50px] max-lg:text-[23px]'>
            Service  For
          </h2>

        </div>

        <div className='flex gap-2 pt-1  sm:gap-6 max-md:pt-4'>

          <h3 className='font-bold font-nunito text-[50px] max-lg:text-[23px]'>
            Your
          </h3>

          <h3 className='text-maincolor font-nunito font-[900] text-[50px] max-lg:text-[23px]'>
            Needs!
          </h3>
        </div>

        {/* Search */}

        <div className='z-10 my-16 w-[100%] flex justify-center items-center rounded-lg'>
          <input
            type="search"
            placeholder='what are you loocking for'
            className=' max-md:w-[90vw] h-14 pl-10 w-[50vw] rounded-lg font-nunito bg-bgmain '
          />
        </div>


        {/* WorkWith */}

        <div className="relative w-full flex flex-col items-center">
          {/* Search Bar */}
          <div className="max-sm:hidden w-[90%] bg-black h-14 rounded-3xl flex flex-row items-center gap-36 text-white lg:absolute lg:bottom-0">
            <h1 className="pl-36 font-nunito font-bold">Trusted By</h1>
            {Brand.map((brandItem, index) => (
              <h1 key={index}>


              </h1>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}