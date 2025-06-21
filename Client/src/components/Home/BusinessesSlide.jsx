import React from "react";
import ulogo from "../../assets/Home/FindFreelance/img01.png";

export default function BusinessesSlide() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center py-8 px-4 cursor-pointer mt-6">
      {/* Header */}

      <h1 className="lg:w-[65%] text-center font-bold text-3xl lg:text-5xl md:text-3xl  sm:text-xl  max-sm:text-[25px] w-[100%] font-nunito">
        Why businesses choose Wabbit for their talent needs.

      </h1>

      {/* Flexbox Container */}

      <div className="flex flex-wrap items-start gap-8 justify-center">

        {/* Card 1 */}

        <div className="max-w-[400px] rounded-lg p-6 text-center transition-shadow duration-300 ease-in-out bg-white">

          <img src={ulogo} alt="ulogo" className="mx-auto mb-4 h-24 w-24" />

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Delivery in 24 hours
          </h1>

          <p className="text-gray-600 text-left text-lg lg:text-xl">
            Businesses receive their work delivered in just 24 hours, ensuring
            timely access to the results they need.
          </p>

        </div>

        {/* Card 2 */}

        <div className="max-w-[400px] rounded-lg p-6 text-center  transition-shadow duration-300 ease-in-out bg-white">

          <img src={ulogo} alt="ulogo" className="mx-auto mb-4 h-24 w-24" />

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Hire first, pay later
          </h1>

          <p className="text-gray-600 text-center pl-5 text-lg lg:text-xl ">
            Assess potential candidates for your role, negotiate their rates,
            and pay only for the work you authorize.
          </p>

        </div>

        {/* Card 3 */}

        <div className="max-w-[400px] rounded-lg p-6 text-center transition-shadow duration-300 ease-in-out bg-white">

          <img src={ulogo} alt="ulogo" className="mx-auto mb-4 h-24 w-24" />

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Reliable and secure
          </h1>

          <p className="text-gray-600 text-center pl-1 text-lg lg:text-xl ">

            Devote your attention to your work, while we ensure your data and
            privacy are secure. We're available 24/7 for any assistance you may
            need.
          </p>
        </div>

      </div>
    </div>
  );
}
