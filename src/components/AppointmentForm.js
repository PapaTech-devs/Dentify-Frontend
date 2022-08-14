// import React, { useState } from "react";
// import { getPatient } from "../utils/queryDatabase";

export default function AppointmentForm({
  onSubmit,
  appoinment,
  setAppointment,
  setFormState,
}) {
  const setInputValues = (e) => {
    const { name, value } = e.target;
    setAppointment({
      ...appoinment,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="mb-3 xl:w-96 flex lg:flex-row flex-col justify-center items-center p-3 pt-4"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="patient-id"
          name="patientid"
          onChange={setInputValues}
          className="
        form-control
        block
        w-72
        px-3
        py-1.5
        mb-1.5
        lg:mb-0
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
        <div class="inline-flex px-1" role="group">
          <input
            type="submit"
            value="Create appointment"
            className="inline-flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1.5 px-4 border border-blue-500 hover:border-transparent rounded"
          ></input>
          <button
            type="button"
            className="inline-flex bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1.5 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={() => setFormState(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
