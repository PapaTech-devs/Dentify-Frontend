import { AiFillCloseCircle, AiFillCopy } from "react-icons/ai";
import React from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PatientDetails({ patient, screenHandler }) {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between pb-4">
        <p className="text-center text-xl">PATIENT MEDICAL REPORT</p>
        <button onClick={() => screenHandler(null)}>
          <AiFillCloseCircle size={34} />
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Patient Name: </p>
          <p>{patient.name}</p>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Patient ID: </p>
          <button
            className="cursor-pointer flex space-x-1 items-center"
            onClick={() => {
              copy(patient.patientid);
              toast.info(`Patient id copied to clipboard`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            <p>{patient.patientid}</p> <AiFillCopy />
          </button>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Patient Email: </p>
          <a
            className="hover:underline hover:text-blue-500"
            href={`mailto:${patient.email}`}
          >
            {patient.email}
          </a>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Mobile Number: </p>
          <a
            className="hover:underline hover:text-blue-500"
            href={`tel:${patient.mobile_number}`}
          >
            {patient.mobile_number}
          </a>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Current Address: </p>
          <p>{patient.address}</p>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
