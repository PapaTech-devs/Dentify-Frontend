import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useUserData } from "../../hooks/userHooks";
import { getAllUserAppointments, getAllUsers } from "../../utils/queryDatabase";
import InfiniteLoading from "../../utils/InfiniteLoading";
import PatientList from "./PatientList";
import PatientDetails from "../patientdetails/PatientDetails";
import { useAuth } from "../../hooks/contextHooks";

export default function YourAppointments() {
  const [userData, setUserData] = useUserData();
  const [selectedOption, setSelectedOption] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const { authUser } = useAuth();

  // console.log("authUser", authUser);

  function getaDoctor(list) {
    return list.filter((user) => user.role.includes("doctor"))[0];
  }

  useEffect(() => {
    async function fetchUsers() {
      const list = await getAllUsers();
      setUserData(list);
      if (authUser.role.includes("admin")) {
        setDoctors(list.filter((user) => user.role.includes("doctor")));
        const doctor = getaDoctor(list);
        setSelectedOption({ value: doctor, label: doctor.name });
      } else {
        setDoctors([authUser]);
        const doctor = authUser;
        setSelectedOption({ value: doctor, label: doctor.name });
      }
    }
    if (userData.length === 0) fetchUsers();
    else {
      if (authUser.role.includes("admin")) {
        const doctor = getaDoctor(userData);
        setSelectedOption({ value: doctor, label: doctor.name });
        setDoctors(userData.filter((user) => user.role.includes("doctor")));
      } else {
        setDoctors([authUser]);
        const doctor = authUser;
        setSelectedOption({ value: doctor, label: doctor.name });
      }
    }
    // eslint-disable-next-line
  }, []);

  async function handleSelectChange(e) {
    setLoading(true);
    setSelectedOption({ value: e.value, label: e.label });
    const list = await getAllUserAppointments(e.value.userid);
    setPatients(list);
    setLoading(false);
  }

  if (!selectedOption && !doctors) return <>Loading ...</>;
  else if (showDetails)
    return (
      <PatientDetails
        setPatients={setPatients}
        patient={showDetails}
        screenHandler={setShowDetails}
        patientList={patients}
      />
    );
  return (
    <div className="w-full h-full md:p-8 p-4">
      <p className="text-2xl font-medium pb-4">
        Select a doctor to see there recent appointments
      </p>
      <Select
        options={doctors.map((doctor) => ({
          value: doctor,
          label: doctor.name,
        }))}
        onChange={handleSelectChange}
      />

      {loading ? (
        <InfiniteLoading length={7} />
      ) : (
        patients && (
          <PatientList
            patients={patients}
            screenHandler={setShowDetails}
            doctorName={selectedOption.value.name}
          />
        )
      )}
    </div>
  );
}
