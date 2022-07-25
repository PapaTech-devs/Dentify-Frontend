import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/contextHooks";
import { storeUser } from "../utils/queryDatabase";

export default function RegisterPage() {
  const { createUser, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({
    fullName: null,
    email: null,
    age: null,
    password: null,
    confirmPassword: null,
    mobileNumber: null,
    sex: null,
    organization: null,
    registrationNo: null,
    designation: null,
  });
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    designation: "",
    registrationNo: "",
  });
  const [mobileNumber, setMobileNumber] = useState("");
  const [sex, setSex] = useState("");
  const [organization, setOrganization] = useState("");
  const [doctor, setDoctor] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email.toLowerCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorObject = {
      fullName: null,
      email: null,
      age: null,
      password: null,
      confirmPassword: null,
      mobileNumber: null,
      sex: null,
      organization: null,
      registrationNo: null,
      designation: null,
    };

    // check for email
    if (!validateEmail(values.email)) {
      errorObject.email = "Enter a valid email";
    } else {
      errorObject.email = null;
    }

    // check for full name
    if (values.fullName.length <= 6) {
      errorObject.fullName = "Please enter your full name";
    } else {
      errorObject.fullName = null;
    }

    // check for mobile number
    if (!mobileNumber) {
      errorObject.mobileNumber = "Please enter your mobile number";
    } else {
      errorObject.mobileNumber = null;
    }

    // check for sex
    if (sex.length === 0) {
      errorObject.sex = "Please select your gender";
    } else {
      errorObject.sex = null;
    }

    // check for age
    if (values.age.toString().length === 0) {
      errorObject.age = "Please enter your age";
    } else {
      errorObject.age = null;
    }

    // check for organization
    if (organization.length === 0) {
      errorObject.organization = "Please select your organization";
    } else {
      errorObject.organization = null;
    }

    // check for password
    if (values.password.length <= 6) {
      errorObject.password = "Please enter a password of length 7 or more";
    } else {
      errorObject.password = null;
    }

    // check for confirm password
    if (values.confirmPassword.length === 0) {
      errorObject.confirmPassword = "Please enter your password again";
    } else if (values.confirmPassword !== values.password) {
      errorObject.confirmPassword = "Passwords doesn't match";
    } else {
      errorObject.confirmPassword = null;
    }

    // check for doctor details
    if (doctor && values.designation.length === 0) {
      errorObject.designation = "Please enter your designations";
    } else {
      errorObject.designation = null;
    }

    if (doctor && values.registrationNo.length === 0) {
      errorObject.registrationNo = "Please enter your registration number";
    } else {
      errorObject.registrationNo = null;
    }
    setError(errorObject);
    if (
      errorObject.email ||
      errorObject.confirmPassword ||
      errorObject.age ||
      errorObject.fullName ||
      errorObject.mobileNumber ||
      errorObject.organization ||
      errorObject.password ||
      errorObject.sex ||
      (doctor && (errorObject.designation || errorObject.registrationNo))
    ) {
      return;
    }

    setLoading(true);
    try {
      values.mobileNumber = mobileNumber;
      values.organization = organization;
      values.sex = sex;
      values.role = doctor ? ["doctor"] : ["moderator"];
      const userid = await createUser(values.email, values.password);
      values.userid = userid;
      const user = await storeUser(values);
      setAuthUser(user);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          errorObject.email = "User with this email already exists.";
          break;
        case "auth/weak-password":
          errorObject.password = "Try a stronger password.";
          break;
        default:
          errorObject.email = "Internal server error.";
      }
      setError(errorObject);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col mx-4 my-8 md:mx-0 px-12 py-10 md:w-2/5 space-y-4 items-center border-2 rounded-sm">
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
          {errors.fullName ? (
            <p className="text-red-500 font-semibold self-start">
              {errors.fullName}
            </p>
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="johndoe@gmail.com"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          {errors.email ? (
            <p className="text-red-500 font-semibold self-start">
              {errors.email}
            </p>
          ) : (
            <></>
          )}
          <PhoneInput
            name="mobileNumber"
            placeholder="9876543210"
            style={{ fontSize: "18px" }}
            value={mobileNumber}
            onChange={setMobileNumber}
            className="p-2"
          />
          {errors.mobileNumber ? (
            <p className="text-red-500 font-semibold self-start">
              {errors.mobileNumber}
            </p>
          ) : (
            <></>
          )}
          <div className="flex justify-between items-center">
            <div className="md:w-5/12">
              <input
                type="number"
                name="age"
                value={values.number}
                onChange={handleInputChange}
                placeholder="Age"
                className="py-2 px-3 w-4/5 md:w-full focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
              />
              {errors.age ? (
                <p className="text-red-500 font-semibold self-start">
                  {errors.age}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="md:w-5/12">
              <select
                className="py-2 px-3 md:w-full focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
                name="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              {errors.sex ? (
                <p className="text-red-500 font-semibold self-start">
                  {errors.sex}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <select
            className="py-2 px-3 w-full focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
            name="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          >
            <option value="">Select Organization</option>
            <option value="organization1">Organization A</option>
            <option value="organization2">Organization B</option>
            <option value="organization3">Organization C</option>
          </select>
          {errors.organization ? (
            <p className="text-red-500 font-semibold self-start">
              {errors.organization}
            </p>
          ) : (
            <></>
          )}
          <div className="flex space-x-4 items-center">
            <p className="text-lg">Are you a doctor?</p>
            <input
              type="checkbox"
              className="w-4 h-4"
              onChange={() => setDoctor(!doctor)}
            />
          </div>
          {doctor && (
            <>
              <input
                type="text"
                name="designation"
                value={values.designation}
                onChange={handleInputChange}
                placeholder="Your designation"
                className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
              />
              {errors.designation ? (
                <p className="text-red-500 font-semibold self-start">
                  {errors.designation}
                </p>
              ) : (
                <></>
              )}
              <input
                type="text"
                name="registrationNo"
                value={values.registrationNo}
                onChange={handleInputChange}
                placeholder="Your registration number"
                className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
              />
              {errors.registrationNo ? (
                <p className="text-red-500 font-semibold self-start">
                  {errors.registrationNo}
                </p>
              ) : (
                <></>
              )}
            </>
          )}
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          {errors.password ? (
            <p className="text-red-500 font-semibold self-start">
              {errors.password}
            </p>
          ) : (
            <></>
          )}
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="py-2 px-3 focus:outline-1 outline-gray-500 text-lg bg-slate-100 rounded-sm"
          />
          {errors.confirmPassword ? (
            <p className="text-red-500 font-semibold self-start">
              {errors.confirmPassword}
            </p>
          ) : (
            <></>
          )}
          {loading ? (
            <input
              value="Submit"
              type="submit"
              disabled
              className="py-2 px-3 cursor-pointer bg-green-500 w-full disabled:bg-slate-300  text-white text-lg font-semibold rounded-sm"
            />
          ) : (
            <input
              value="Submit"
              type="submit"
              className="py-2 px-3 cursor-pointer bg-green-500 w-full text-white text-lg font-semibold rounded-sm"
            />
          )}
        </form>
        {loading ? (
          <Link
            to="/login"
            disabled
            className="py-2 px-3 w-full text-center disabled:text-gray-300  text-gray-500 underline text-lg font-semibold rounded-sm"
          >
            Already have an account?
          </Link>
        ) : (
          <Link
            to="/login"
            className="py-2 px-3 w-full text-center text-gray-500 underline text-lg font-semibold rounded-sm"
          >
            Already have an account?
          </Link>
        )}
      </div>
    </div>
  );
}
