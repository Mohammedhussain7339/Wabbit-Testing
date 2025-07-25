import React from 'react'
import ulogo from "../../assets/Home/FindFreelance/img01.png";
import slide1 from "../../assets/pagespng/daily-tasks.png"
import slide2 from "../../assets/pagespng/flash.png"
import slide3 from "../../assets/pagespng/Hiring-removebg-preview.png"

export default function FreelancersSlide() {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center py-8 px-4  cursor-pointer font-nunito mt-16
    ">
      {/* Header */}

      <h1 className="lg:w-[65%] text-center font-bold text-3xl lg:text-5xl md:text-3xl  sm:text-xl  max-sm:text-[25px] w-[100%]">
        Why Wabbit is the top choice for
        freelancers

      </h1>

      {/* Flexbox Container */}
      <div className="flex flex-wrap items-start gap-8 justify-center">

        {/* Card 1 */}
        <div className="max-w-[400px] rounded-lg p-6 text-center transition-shadow duration-300 ease-in-out bg-white">

          <img src={slide1} alt="ulogo" className="mx-auto mb-4 h-24 w-24" />

          <h1 className="text-2xl lg:text-3xl font-bold mb-4 cursor-pointer">
            Quick Payments

          </h1>
          <p className="text-gray-600 text-left text-lg lg:text-xl">

            Freelancers will receivetheir payment within 48
            hours once the project issubmitted and approved
            by the client.
          </p>
        </div>

        {/* Card 2 */}
        <div className="max-w-[400px] rounded-lg p-6 text-center  transition-shadow duration-300 ease-in-out bg-white">

          <img src={slide2} alt="ulogo" className="mx-auto mb-4 h-24 w-24" />

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Pay minimal fees
          </h1>
          <p className="text-gray-600 text-left text-lg lg:text-xl">

            Where other platformscharge 30% per project
            and add hidden fees, wekeep it simple with just a
            12% charge.

          </p>
        </div>

        {/* Card 3 */}
        <div className="max-w-[400px] rounded-lg p-6 text-center transition-shadow duration-300 ease-in-out bg-white">

          <img src={slide3} alt="ulogo" className="mx-auto mb-4 h-24 w-24" />

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Daily Projects

          </h1>
          <p className="text-gray-600 text-left text-lg lg:text-xl">

            Our freelancers arealways in demand, never
            unoccupied, and always engaged with work..

          </p>
        </div>
      </div>
    </div>
  )
}
