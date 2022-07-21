import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm.js";

export default function ShowAppoinments({
  selectedDate,
  userAppointments,
  selectedUser,
}) {
  const [formState, setFormState] = useState(false);
  const [patientData, setPatientData] = useState({});
  if (!selectedUser.value) console.log("Appoinment of ", selectedUser.name);
  else console.log("Appoinment of ", selectedUser.value);
  console.log(userAppointments);

  // const appoinments = allUsers.userid(selectedUser.value).appoinments;
  return (
    <div>
      {/* appointment list */}
      <div>
        <p>Appoinments of {selectedDate.toDateString()}</p>
        {userAppointments.map((appointment, index) => {
          if (selectedDate.toDateString() === appointment.Date)
            return <li key={index}>{appointment.patientid}</li>;
          else return <div key={index}></div>;
        })}
      </div>

      {/* add appointment */}

      <div>
        <button
          onClick={() => {
            console.log("clicked");
            setFormState(true);
          }}
        >
          Add new appointment
        </button>
      </div>
      {formState && <AppointmentForm setPatientData={setPatientData} />}
    </div>
  );
}
