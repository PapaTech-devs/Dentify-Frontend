// import React, { useState } from "react";

export default function ShowAppoinments({ currentDate }) {
  const appoinments = [
    { patientID: "001" },
    { patientID: "002" },
    { patientID: "003" },
  ];
  return (
    <div>
      <div>
        <p>{currentDate.toDateString()} Appoinments</p>
        {appoinments.map((appointment) => (
          <li>{appointment.patientID}</li>
        ))}
      </div>
    </div>
  );
}
