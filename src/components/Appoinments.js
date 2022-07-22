import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm.js";
// import newAppointmentForm from "./newPatientAppointment.js";
import { updateUserAppointment, getPatient } from "../utils/queryDatabase.js";
import { useUserData } from "../hooks/userHooks.js";
import { useAuth } from "../hooks/contextHooks.js";

export default function ShowAppoinments({
  selectedDate,
  userAppointments,
  selectedUser,
}) {
  const [formState, setFormState] = useState(false);
  const [newformState, setNewFormState] = useState(false);
  const [appoinment, setAppointment] = useState({});
  const [userData, setUserData] = useUserData();
  const { authUser, setAuthUser } = useAuth();
  if (!selectedUser.value) console.log("Appoinment of ", selectedUser.name);
  else console.log("Appoinment of ", selectedUser.value);
  console.log("Selected users appointments:", userAppointments);

  // function checkAppointment(singleAppointment) {
  //   return singleAppointment.Date && selectedDate.toDateString();
  // }

  async function onSubmit(e) {
    e.preventDefault();
    console.log("Submit");
    try {
      const cpatient = await getPatient(appoinment.patientid);
      appoinment["Date"] = selectedDate.toDateString();
      console.log("current patient", cpatient, appoinment);
      console.log("For Dr", selectedUser.name, selectedUser.userid);
      if (
        cpatient &&
        !userAppointments.find((singleAppointment) => {
          // console.log(singleAppointment);
          return (
            singleAppointment.Date === selectedDate.toDateString() &&
            singleAppointment.patientid === appoinment.patientid
          );
        })
      ) {
        console.log("The patient didnt had any appointment today");
        const userWithNewAppointment = await updateUserAppointment(
          selectedUser.userid,
          appoinment
        );
        console.log(userWithNewAppointment);

        if (userWithNewAppointment.userid === authUser.userid) {
          const tempAuthUser = authUser;
          setAuthUser(tempAuthUser);
        }
        const newList = userData.map((tempuser) => {
          if (tempuser.userid === userWithNewAppointment.userid) {
            tempuser = userWithNewAppointment;
          }
          return tempuser;
        });
        setUserData(newList);
      } else {
        if (cpatient) console.log("Appointment already exists");
        else console.log("Patient does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const appoinments = allUsers.userid(selectedUser.value).appoinments;
  return (
    <div>
      {/* appointment list */}
      <div>
        <h4 class="font-medium leading-tight text-lg mt-0 mb-2 text-gray-800 px-1">
          Appoinments of {selectedDate.toDateString()}
        </h4>
        {userAppointments.map((appointment, index) => {
          if (selectedDate.toDateString() === appointment.Date)
            return (
              <div className="list-disc px-3">
                <li key={index}>{appointment.patientid}</li>
              </div>
            );
          else return <div key={index}></div>;
        })}
      </div>

      {/* add appointment */}

      <div class="px-5 pt-3 pb-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            console.log("clicked");
            setFormState(true);
            setNewFormState(false);
          }}
        >
          Add appointment for existing patient
        </button>
      </div>
      {formState && (
        <AppointmentForm
          onSubmit={onSubmit}
          appoinment={appoinment}
          setAppointment={setAppointment}
        />
      )}
      <div class="px-7">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            console.log("clicked");
            setNewFormState(true);
            setFormState(false);
          }}
        >
          Add appointment for a new patient
        </button>
      </div>
      {newformState && <p>A form will open for creating new appoinment</p>}
    </div>
  );
}
