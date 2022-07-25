import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm.js";
import NewAppointment from "./NewAppointment.js";
import { updateUserAppointment, getPatient } from "../utils/queryDatabase.js";
import { useUserData } from "../hooks/userHooks.js";
import { useAuth } from "../hooks/contextHooks.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowAppoinments({
  selectedDate,
  userAppointments,
  selectedUser,
}) {
  const [formState, setFormState] = useState(false);
  const [newFormState, setNewFormState] = useState(false);
  const [appoinment, setAppointment] = useState({});
  const [userData, setUserData] = useUserData();
  const { authUser, setAuthUser } = useAuth();
  if (!selectedUser.value) console.log("Appoinment of ", selectedUser.name);
  else console.log("Appoinment of ", selectedUser.value);
  console.log("Selected users appointments:", userAppointments);

  // function checkAppointment(singleAppointment) {
  //   return singleAppointment.Date && selectedDate.toDateString();
  // }

  async function onSubmit(e, patientid) {
    if (e) e.preventDefault();
    try {
      if (patientid) {
        appoinment.patientid = patientid;
      }
      const cpatient = await getPatient(appoinment.patientid);
      appoinment["Date"] = selectedDate.toDateString();
      // console.log("current patient", cpatient, appoinment);
      // console.log("For Dr", selectedUser.name, selectedUser.userid);
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
        // console.log("The patient didnt had any appointment today");
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
        toast.success(
          `New appointment created with id ${appoinment.patientid} under Dr. ${selectedUser.name}`,
          {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      } else {
        if (cpatient)
          toast.error(
            "Appointment already exists for this patient on this date",
            {
              position: "top-right",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            }
          );
        else
          toast.error("Patient does not exists with this id", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const appoinments = allUsers.userid(selectedUser.value).appoinments;
  return (
    <div>
      {/* appointment list */}

      {/* add appointment */}

      <div class="flex items-center justify-center ">
        <div class="inline-flex" role="group">
          <button
            onClick={() => {
              console.log("clicked");
              setFormState(true);
              setNewFormState(false);
            }}
            type="button"
            class="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-lime-500 focus:outline-none focus:ring-0 active:bg-green-600 transition duration-150 ease-in-out"
          >
            Appointment for existing patient
          </button>

          <button
            onClick={() => {
              console.log("clicked");
              setNewFormState(true);
              setFormState(false);
            }}
            type="button"
            class="rounded-r inline-block px-6 py-2.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-lime-500 focus:outline-none focus:ring-0 active:bg-green-600 transition duration-150 ease-in-out"
          >
            New patient appointment
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      {/* appointmrnt for existing patient */}
      {formState && (
        <AppointmentForm
          onSubmit={onSubmit}
          appoinment={appoinment}
          setAppointment={setAppointment}
          setFormState={setFormState}
        />
      )}

      {/* appointment for new patient (add new patient) */}

      {newFormState && (
        <NewAppointment
          onPatientSaved={onSubmit}
          newFormState={newFormState}
          setNewFormState={setNewFormState}
        />
      )}

      <div>
        <h4 class="text-center font-medium leading-tight text-lg mt-0 mb-2 text-gray-800 pt-3">
          Appointments of {selectedDate.toDateString()}
        </h4>
        {userAppointments.map((appointment, index) => {
          if (selectedDate.toDateString() === appointment.Date)
            return (
              <div
                className="block p-3 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 text-center w-full font-semibold"
                key={index}
              >
                {appointment.patientid}
              </div>
            );
          else return <div key={index}></div>;
        })}
      </div>
    </div>
  );
}
