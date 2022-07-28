import React from "react";
import ShowOrganization from "./ShowOrganization";
import ShowCalendar from "./ShowCalendar";
import YourAppointments from "./yourappointments/YourAppointments";
import AllPatients from "./allpatients/AllPatients";

export default function MainComponent({ index }) {
  return (
    <div className="min-h-screen w-full flex justify-center">
      {index === 1 && <ShowOrganization />}
      {index === 2 && <ShowCalendar />}
      {index === 3 && <YourAppointments />}
      {index === 4 && <AllPatients />}
    </div>
  );
}
