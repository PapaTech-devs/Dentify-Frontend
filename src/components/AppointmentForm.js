// import React, { useState } from "react";
// import { getPatient } from "../utils/queryDatabase";

export default function AppointmentForm({
  onSubmit,
  appoinment,
  setAppointment,
}) {
  const setInputValues = (e) => {
    const { name, value } = e.target;
    setAppointment({
      ...appoinment,
      [name]: value,
    });
  };

  console.log(appoinment);

  return (
    <div>
      <form className="mb-3 xl:w-96" onSubmit={onSubmit}>
        <div className="px-3 p-2 p">
          <input
            type="text"
            placeholder="patient-id"
            name="patientid"
            onChange={setInputValues}
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          ></input>
        </div>
        <div className="px-20">
          <input
            type="submit"
            value="Create appointment"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          ></input>
        </div>
      </form>
    </div>
  );
}
