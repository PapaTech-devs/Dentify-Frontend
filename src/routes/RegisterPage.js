import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const initialValues = {
    fullName: "",
    email: "",
    age: "",
    organization: "",
    password: "",
    confirmPassword: "",
  };

  const [values, setValues] = useState(initialValues);
  const [mobileNumber, setMobileNumber] = useState("");
  const [sex, setSex] = useState("");

  const handleInputChange = (e) => {
    console.log("Hi");
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    console.log("Form submit", values, sex, mobileNumber);
    e.preventDefault();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col mx-4 md:mx-0 px-12 py-10 md:w-1/4 space-y-4 items-center border-2 rounded-sm">
        <p className="text-4xl font-bold pb-8">Register</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full"
        >
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="johndoe@gmail.com"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          <PhoneInput
            name="mobileNumber"
            placeholder="+91 9876543210"
            value={mobileNumber}
            onChange={setMobileNumber}
            className="p-2"
          />
          <div className="flex justify-between items-center">
            <input
              type="number"
              name="age"
              value={values.number}
              onChange={handleInputChange}
              placeholder="Age"
              className="py-2 px-3 w-5/12 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
            />
            <select
              className="py-2 px-3 w-5/12 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
              name="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          <input
            className="py-2 px-3 bg-green-500 w-full text-white text-lg font-semibold rounded-sm"
            value="Submit"
            type="submit"
          />
        </form>
        <Link
          to="/login"
          className="py-2 px-3 w-full text-center text-gray-500 underline text-lg font-semibold rounded-sm"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
