import React, { useState } from "react";
import { storePatient } from "../utils/queryDatabase";
import Select from "react-select";

const INPUT_STYLE = `form-control block
        w-55
        px-3
        py-1.5
        mb-1.5
        lg:mb-0
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

function NewAppointment({ newFormState, setNewFormState, onPatientSaved }) {
  const initialValues = {
    name: "",
    email: "",
    age: "",
    mobile_number: "",
    address: "",
    sex: "",
  };
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({
    name: null,
    //email: null,
    age: null,
    sex: null,
    //mobile_number: null,
    //address: null,
  });

  // const validateEmail = (email) => {
  //   // eslint-disable-next-line
  //   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
  //     email.toLowerCase()
  //   );
  // };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const errorObject = {
      name: null,
      age: null,
      sex: null,
    };

    // check for full name
    if (values.name.length <= 6) {
      errorObject.name = "Please enter your full name";
    } else {
      errorObject.name = null;
    }

    // check for sex
    if (values.sex.length === 0) {
      errorObject.sex = "Please select your gender";
    } else {
      errorObject.sex = null;
    }

    // check for age
    if (values.age.length === 0) {
      errorObject.age = "Please enter your age";
    } else {
      errorObject.age = null;
    }

    setError(errorObject);
    if (errorObject.sex || errorObject.age || errorObject.name) {
      return;
    }

    setLoading(true);
    try {
      const id = values.name.split(" ")[0] + makeid(8);
      values.patientid = id;
      await storePatient(values);
      onPatientSaved(null, id);
      setLoading(false);
    } catch (e) {
      console.error("Error store patient " + e);
      setLoading(false);
    } finally {
      setNewFormState(false);
    }
  };

  return (
    <>
      {newFormState ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add patient details
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className="grid grid-cols-2 gap-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-col">
                      <p className="text-sm text-red-400 font-semibold">
                        {errors.name}
                      </p>
                      <input
                        type="text"
                        className={INPUT_STYLE}
                        placeholder="Enter name"
                        name="name"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-red-400 font-semibold">
                        {errors.age}
                      </p>
                      <input
                        type="text"
                        className={INPUT_STYLE}
                        placeholder="Enter age"
                        name="age"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-red-400 font-semibold">
                        {errors.mobile_number}
                      </p>
                      <input
                        type="text"
                        className={INPUT_STYLE}
                        name="mobile_number"
                        placeholder="MobileNumber(Optional)"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-red-400 font-semibold">
                        {errors.email}
                      </p>
                      <input
                        type="text"
                        className={INPUT_STYLE}
                        name="email"
                        placeholder="Enter email(Optional)"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-red-400 font-semibold">
                        {errors.sex}
                      </p>
                      <Select
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                          { value: "others", label: "Others" },
                        ]}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            sex: e.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-red-400 font-semibold">
                        {errors.address}
                      </p>
                      <input
                        type="text"
                        className={INPUT_STYLE}
                        name="address"
                        placeholder="Enter address(Optional)"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 disabled:text-red-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={loading}
                    onClick={() => setNewFormState(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 disabled:bg-emerald-300 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default NewAppointment;
