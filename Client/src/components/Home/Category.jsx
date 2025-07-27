import React from "react";
import cameraImage from "../../assets/Home/FindFreelance/img02.png";
import canvaImage from "../../assets/Home/Cards/canvaCategoryImg.png";
import webDeveloper from "../../assets/Home/Cards/webDeveloper.png";
import weddingCard from "../../assets/Home/Cards/weddingcard.png"
import mockups from "../../assets/Home/Cards/mockupcards.png"
import graphicDesigner from "../../assets/Home/Cards/graphicDesigner.png";
import photoeditor from "../../assets/Home/Cards/photoeditor.png";
import videoeditor from "../../assets/Home/Cards/video-editor.svg";
import { Link } from "react-router-dom";
export default function Category() {
  const categories = [
    { image: videoeditor, altText: "video editor", label: "Video Editor", link: "/videoeditor" },
    { image: photoeditor, altText: "photo editor", label: "Photo Editor", link: "/photocard" },
    { image: canvaImage, altText: "canva expert", label: "Canva Expert", link: "/canvacard" },
    { image: weddingCard, altText: "Invitation Card", label: "Invitation Card", link: "/invititioncard" },
    { image: webDeveloper, altText: "web developer", label: "Web Developer", link: "/webdeveloper" },
    { image: cameraImage, altText: "UI/UX Designer", label: "UI/UX Designer", link: "/uiux" },
    { image: mockups, altText: "Mockups", label: "Mockups", link: "/mockup" },
    { image: graphicDesigner, altText: "graphic designer", label: "Graphic Designer", link: "/graphicdesigner" },
  ];

  return (
    <div className="min-h-[100vh]  flex items-center flex-col justify-center gap-7 mt-[50px] pb-9">
      <div className="text-center w-[90vw] lg:w-[90vw] h-auto text-black lg:text-start">
        <p className=" text-[25px] sm:text-[35px] lg:text-6xl font-nunito ">Browse professionals by category</p>
      </div>
      <div className="lg:w-[90vw] h-auto text-black">
        <p className="text-center font-nunito sm:text-[25px] lg:text-2xl lg:text-start">
          Searching for work?
          <Link  
            to="monetizeskills"
            className="text-green-600 underline underline-offset-4 font-bold"
          >
            Join Wabbit
          </Link>
        </p>
      </div>

      <div className="flex flex-row flex-wrap min-h-[70vh] justify-evenly lg:w-[100vw] lg:gap-[1%] ">
        {categories.map((category, index) => (
                    <Link
                    key={index}
                    to={category.link} // Use "to" instead of "href"
                    className="w-[45%] h-[16vh] sm:h-[19vh] lg:w-[20%] my-2 lg:h-[20vh] bg-bgmain rounded-2xl lg:my-2 hover:scale-110 p-2 flex items-center justify-center flex-col cursor-pointer overflow-hidden shadow-custom-complex transition duration-300"
                  >
                    
                    <div className="h-[50%] w-[50%] flex items-center justify-center ">
                      <img
                        src={category.image}
                        alt={category.altText}
                        className="h-[100%] w-[100%] object-contain "
                      />
                    </div>
                    <p className="text-[15px] sm:text-[22px] lg:text-2xl font-semibold">{category.label}</p>
                  </Link>
        // </div>
        ))}
      </div>
    </div>
  );
}
