// data.js
import businessmanagement from "../../../assets/Auth/Asset for 2nd modal/business-management.png";
import foldermanagement from "../../../assets/Auth/Asset for 2nd modal/foldermanagement.png";
import toiletpaper from "../../../assets/Auth/Asset for 2nd modal/toiletpaper.png";
import apartment from "../../../assets/Auth/Asset for 3rd modal/apartment.png";
import home from "../../../assets/Auth/Asset for 3rd modal/home.png";
import house from "../../../assets/Auth/Asset for 3rd modal/house.png";
import callme from "../../../assets/Auth/Asset for 3rd modal/callme.png";
import apartments from "../../../assets/Auth/Asset for 3rd modal/apartments.png";
import business_management from "../../../assets/Auth/Asset-4th-modal/businessmanagement.png";
import telescope from "../../../assets/Auth/Asset-4th-modal/tele.png";
import folder_management from "../../../assets/Auth/Asset-4th-modal/folder.png";
import effort from "../../../assets/Auth/For Freelancer/2nd - Modal/effort.png";
import flexible from "../../../assets/Auth/For Freelancer/2nd - Modal/flexible.png";
import royal from "../../../assets/Auth/For Freelancer/2nd - Modal/royal.png";
import united from "../../../assets/Auth/For Freelancer/2nd - Modal/united.png";
import giftbox from "../../../assets/Auth/For Freelancer/3rd - Modal/gift-box.png";
import digitalnomad from "../../../assets/Auth/For Freelancer/3rd - Modal/digital-nomad.png";
import listen from "../../../assets/Auth/For Freelancer/3rd - Modal/listen.png";
import technology from "../../../assets/Auth/For Freelancer/3rd - Modal/technology.png";


export const questionsData = [
  {
    "question": "What do you plan to use Wabbit for?",
    "subtitle": "There's something for everyone.",
    "options": [
      {
        "label": "Primary job",
        "sublabel": "A project for the company you work for or own business.",
        "icon": businessmanagement
      },
      {
        "label": "A side project",
        "sublabel": "Anything you're working on apart from your main job, like a side hustle.",
        "icon": foldermanagement
      },
      {
        "label": "Personal use",
        "sublabel": "Services that are for your own growth or enjoyment, outside of work.",
        "icon": toiletpaper
      }
    ]
  },
  {
    "question": "How many people work at your company?",
    "subtitle": "",
    "options": [
      {
        "label": "Just me",
        "sublabel": "",
        "icon": callme
      },
      {
        "label": "2-10",
        "sublabel": "",
        "icon": home
      },
      {
        "label": "11-50",
        "sublabel": "",
        "icon": house
      },
      {
        "label": "51-500",
        "sublabel": "",
        "icon": apartments
      },
      {
        "label": "500+",
        "sublabel": "",
        "icon": apartment
      }
    ]
  },
  {
    "question": "Nice! And what are you looking for today?",
    "subtitle": "We're here to help you make it happen.",
    "options": [
      {
        "label": "To start a project",
        "sublabel": "",
        "icon": business_management
      },
      {
        "label": "A specific project",
        "sublabel": "",
        "icon": folder_management
      },
      {
        "label": "Just exploring",
        "sublabel": "",
        "icon": telescope
      }
    ]
  }
];


export const questionsData2 = [
  {
    question: "What type of Freelancer are you",
    subtitle: "Whatever your style,we'll make it work.",
    options: [
      {
        label: "A side hustle",
        icon: effort, 
      },
      {
        label: "Solo freelancer",
        icon: flexible, 
      },
      {
        label: "Agency Employee",
        icon: royal, 
      },
      {
        label: "Agency owner",
        icon: united, 
      },
    ],
  },
  {
    question: "What's your freelancing experience?",
    subtitle: "Whatever your style,we'll make it work.",
    options: [
      {
        label: "Getting started",
        icon: giftbox, 
      },
      {
        label: "Freelancing online",
        icon: digitalnomad, 
      },
      {
        label: "Freelancing offline",
        icon: technology, 
      },
      {
        label: "online and offline",
        icon: listen, 
      },
    ],
  },
]