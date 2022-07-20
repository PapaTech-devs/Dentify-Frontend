import React from "react";
import ShowOrganization from "./ShowOrganization";
import Calendar from "./Calendar";

export default function MainComponent({ index }) {
  return (
    <div className="min-h-screen w-full">
      {index === 1 && <ShowOrganization />}
      {index === 2 && <Calendar />}
    </div>
  );
}
