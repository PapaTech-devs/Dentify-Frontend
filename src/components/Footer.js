import React from "react";
import { ReactComponent as GmailLogo } from "../svg/gmail.svg";
import { ReactComponent as FacebookLogo } from "../svg/facebook.svg";
import { ReactComponent as InstagramLogo } from "../svg/instagram.svg";
import { ReactComponent as PhoneLogo } from "../svg/phone.svg";

export default function Footer() {
  return (
    <div className="h-44 md:h-52 bg-black px-4 md:px-10 flex justify-between items-start py-6">
      <div className="flex flex-col space-y-4 w-1/3">
        <p className="text-white text-2xl font-bold self-start">Contacts</p>
        <p className="text-white font-thin">
          developed by{" "}
          <a href="https://debapriya-source.github.io/PapaTech" className="font-semibold">
            @PapaTech
          </a>
        </p>
      </div>

      <div className="w-2/3 md:w-1/3 space-y-5">
        <div className="flex space-x-2">
          <button>
            <FacebookLogo fill="white" height="35px" width="35px" />
          </button>
          <button>
            <InstagramLogo fill="white" height="35px" width="35px" />
          </button>
        </div>
        <div className="flex">
          <GmailLogo className="ml-1" fill="white" width="35px" />
          <button
            className="text-white"
            onClick={() =>
              (window.location = "mailto:mandal.suchetan@gmail.com")
            }
          >
            mandal.suchetan@gmail.com
          </button>
        </div>
        <div className="flex">
          <PhoneLogo fill="white" height="35px" width="35px" />
          <button
            className="text-white"
            onClick={() => (window.location = "tel:+918918425539")}
          >
            +91 8918425539
          </button>
        </div>
      </div>
    </div>
  );
}
