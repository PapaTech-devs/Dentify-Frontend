import React from "react";

export default function SidePanel({ index, setIndex }) {
  console.log(index);
  return (
    <div className="min-h-screen w-64 bg-slate-700 flex flex-col items-center space-y-4 py-6">
      <div
        className={`transition duration-150 ease-in-out hover:scale-105 px-4 py-2 ${
          index === 1 && "bg-slate-400"
        } rounded-full cursor-pointer`}
        onClick={() => setIndex(1)}
      >
        <p className="text-lg font-semibold text-white">Your organization</p>
      </div>
      <div
        className={`transition duration-150 ease-in-out hover:scale-105 px-4 py-2 ${
          index === 2 && "bg-slate-400"
        } rounded-full cursor-pointer`}
        onClick={() => setIndex(2)}
      >
        <p className="text-lg font-semibold text-white">Add new patient</p>
      </div>
      <div
        className={`transition duration-150 ease-in-out hover:scale-105 px-4 py-2 ${
          index === 3 && "bg-slate-400"
        } rounded-full cursor-pointer`}
        onClick={() => setIndex(3)}
      >
        <p className="text-lg font-semibold text-white">Your patients</p>
      </div>
    </div>
  );
}
