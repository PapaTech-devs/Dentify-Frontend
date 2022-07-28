import React from "react";
import { AiFillPhone, AiOutlineHome } from "react-icons/ai";
import { FiMail } from "react-icons/fi";

export default function PatientList({ patients, doctorName, screenHandler }) {
  return (
    <div className="py-4">
      {doctorName && (
        <p className="pb-4 text-xl font-semibold">
          Patients appointed to Dr.{doctorName}
        </p>
      )}
      <div className="grid lg:grid-cols-3 gap-4">
        {patients.map((patient) => {
          return (
            <div
              key={patient.patientid}
              onClick={() => screenHandler(patient)}
              className="py-4 px-3 bg-gray-200 rounded space-y-1 hover:bg-slate-100 cursor-pointer transition duration-200 ease-in-out"
            >
              <p className="text-xl pb-1 md:hover:font-semibold">
                {patient.name}
              </p>
              <div className="grid md:grid-cols-2">
                <div className="flex items-center space-x-2 w-fit">
                  <AiFillPhone size={20} />
                  <p className="text-base">{patient.mobile_number}</p>
                </div>
                <div className="flex items-center space-x-2 w-fit">
                  <FiMail size={20} />
                  <p className="text-base">{patient.email}</p>
                </div>
                <p className="text-base">Age: {patient.age} years</p>
                <div className="flex items-center space-x-2 w-fit">
                  <AiOutlineHome size={20} />
                  <p className="text-base">{patient.address}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
