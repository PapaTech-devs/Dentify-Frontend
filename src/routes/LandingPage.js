import React from "react";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <div className="h-full px-4 md:px-10 md:flex flex-col items-start justify-evenly my-4 md:my-0">
        <p className="text-2xl font-light">
          <p className="inline font-black">Dentify</p> is a dental clinic
          management software where you can manage your patients, doctors and
          other staffs. Along with that you can create appointments and keep
          track of payments as well.
        </p>
        <div className="flex flex-col">
          <p className="text-2xl font-bold pb-8">KEY FEATURES</p>
          <div className="md:flex md:items-center">
            <div className="md:w-5/6">
              <p className="text-xl font-semibold py-2">
                Create and track appointments
              </p>
              <p className="text-lg">
                You will be able to create appointments for each doctors and
                track them.
              </p>
            </div>

            <div className="md:w-5/6">
              <p className="text-xl font-semibold py-2">User roles</p>
              <p className="text-lg">
                Admin can assign roles to their members which will determine
                what he/she can do in the Dentify.
              </p>
            </div>

            <div className="md:w-5/6">
              <p className="text-xl font-semibold py-2">Report generation</p>
              <p className="text-lg">
                You can monitor and store mouth details of each patients and can
                generate a report which can be saved as pdf.
              </p>
            </div>
          </div>
        </div>
        <p className="text-xl">
          To <p className="inline font-bold">Get Started</p> register as your
          respective role and fill out all details. After that contact your
          organization admin to accept your profile.
        </p>
      </div>
      <Footer />
    </>
  );
}
