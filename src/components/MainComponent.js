import React from "react";
import ShowOrganization from "./ShowOrganization";

export default function MainComponent({ index }) {
  return (
    <div className="min-h-screen w-full">
      {index === 1 && <ShowOrganization />}
    </div>
  );
}
