import React, { useState } from "react";
import MainComponent from "../components/MainComponent";
import SidePanel from "../components/SidePanel";

export default function Dashboard() {
  const [index, setIndex] = useState(1);
  return (
    <div className="flex">
      <SidePanel index={index} setIndex={setIndex} />
      <MainComponent index={index} />
    </div>
  );
}
