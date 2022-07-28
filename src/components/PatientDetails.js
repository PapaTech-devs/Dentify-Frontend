import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";

export default function PatientDetails({ patient, screenHandler }) {
  return (
    <div className="p-4">
      <p>{patient.name}</p>
      <button onClick={() => screenHandler(null)}>
        <AiFillCloseCircle size={34} />
      </button>
    </div>
  );
}
