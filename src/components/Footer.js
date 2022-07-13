import React from "react";
import { ReactComponent as GmailLogo } from "../svg/gmail.svg";
import { ReactComponent as FacebookLogo } from "../svg/facebook.svg";
import { ReactComponent as InstagramLogo } from "../svg/instagram.svg";
import { ReactComponent as PhoneLogo } from "../svg/phone.svg";

export default function Footer() {
  return (
    <div className="h-44 md:h-52 bg-black px-4 md:px-10 flex justify-between items-center py-6">
      <p className="text-white text-2xl font-bold self-start">Contacts</p>
      <div className="w-1/2 md:w-1/3 space-y-5">
        <div className="flex space-x-2">
          <a href="#">
            <FacebookLogo fill="white" height="35px" width="35px" />
          </a>
          <a href="#">
            <InstagramLogo fill="white" height="35px" width="35px" />
          </a>
        </div>
        <div className="flex">
          <GmailLogo className="ml-1" fill="white" width="35px" />
          <button
            className="text-white"
            onClick={() => (window.location = "mailto:johndoe@gmail.com")}
          >
            johndoe@gmail.com
          </button>
        </div>
        <div className="flex">
          <PhoneLogo fill="white" height="35px" width="35px" />
          <button
            className="text-white"
            onClick={() => (window.location = "tel:+919876543210")}
          >
            +91 9876543210
          </button>
        </div>
      </div>
    </div>
  );
}
