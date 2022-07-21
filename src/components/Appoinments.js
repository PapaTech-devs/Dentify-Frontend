// import React, { useState } from "react";

export default function ShowAppoinments({
  selectedDate,
  userAppointments,
  selectedUser,
}) {
  if (!selectedUser.value) console.log("Appoinment of ", selectedUser.name);
  else console.log("Appoinment of ", selectedUser.value);
  console.log(userAppointments);

  //   const appoinments = allUsers.userid(selectedUser.value).appoinments;
  return (
    <div>
      <div>
        <p>Appoinments of {selectedDate.toDateString()}</p>
        {userAppointments.map((appointment, index) => {
          if (selectedDate.toDateString() === appointment.Date)
            return <li key={index}>{appointment.patientid}</li>;
          else return <div key={index}></div>;
        })}
      </div>
    </div>
  );
}
