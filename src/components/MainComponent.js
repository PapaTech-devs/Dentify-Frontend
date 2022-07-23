import React from "react";
import ShowOrganization from "./ShowOrganization";
import ShowCalendar from "./ShowCalendar";

export default function MainComponent({ index }) {
  return (
    <div className="min-h-screen w-full flex justify-center">
      {index === 1 && <ShowOrganization />}
      {index === 2 && <ShowCalendar />}
    </div>
  );
}
