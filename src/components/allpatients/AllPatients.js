import React, { useEffect, useState } from "react";
import InfiniteLoading from "../../utils/InfiniteLoading";
import { getAllPatients } from "../../utils/queryDatabase";
import PatientList from "../yourappointments/PatientList";
import Select from "react-select";
import PatientDetails from "../PatientDetails";

export default function AllPatients() {
  const [patients, setPatients] = useState(null);
  const [store, setStore] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      const list = await getAllPatients();
      setPatients(list);
      setStore(list);
    }
    fetchPatients();
  }, []);

  async function handleSelectChange(e) {
    if (!e) setPatients(store);
    else setPatients(store.filter((patient) => patient.name === e.label));
  }

  if (!patients) return <InfiniteLoading length={7} />;
  else if (showDetails)
    return (
      <PatientDetails patient={showDetails} screenHandler={setShowDetails} />
    );
  return (
    <div className="w-full px-4 py-4">
      <p className="text-xl font-medium md:text-2xl pb-4">
        All patients in your organization
      </p>
      <Select
        options={patients.map((patient) => ({
          value: patient,
          label: patient.name,
        }))}
        className="text-xl"
        onChange={handleSelectChange}
        isSearchable={true}
        isClearable={true}
      />
      <PatientList patients={patients} screenHandler={setShowDetails} />
    </div>
  );
}
