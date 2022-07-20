import React, { useState } from "react";
import Calendar from "react-calendar";
import ShowAppoinments from "./Appoinments";
import "react-calendar/dist/Calendar.css";

export default function ShowCalendar() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div>
        <ShowAppoinments currentDate={value} />
      </div>
    </div>
  );
}
