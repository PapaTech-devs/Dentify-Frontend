import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col mx-4 md:mx-0 md:w-1/4 px-16 py-10 space-y-5 items-center border-2 rounded-sm">
        <p className="text-4xl font-bold py-5">Login</p>
        <input
          type="text"
          placeholder="johndoe@gmail.com"
          className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
        />
        <button className="py-2 px-3 bg-green-500 w-full text-white text-lg font-semibold rounded-sm">
          SignIn
        </button>
        <Link
          to="/register"
          className="py-2 px-3 w-full text-gray-500 text-center underline text-lg font-semibold rounded-sm"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
