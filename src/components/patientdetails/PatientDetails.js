import { AiFillCloseCircle, AiFillCopy, AiFillWarning } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteLoading from "../../utils/InfiniteLoading";
import ToothBox from "./ToothBox";
import { updatePatient } from "../../utils/queryDatabase";
import Select from "react-select";

export default function PatientDetails({
  patient,
  screenHandler,
  setPatients,
  patientList,
}) {
  const [toothList, setToothList] = useState(null);
  const quadrants = ["Upper Right", "Upper Left", "Lower Right", "Lower Left"];
  const qMap = {
    UR: "Upper Right",
    UL: "Upper Left",
    LR: "Lower Right",
    LL: "Lower Left",
  };
  const [modal, setModal] = useState(false);
  const [quadrant, setQuadrant] = useState("Upper Right");
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [stain, setStain] = useState(patient.report.stain);
  const [calculus, setCalculus] = useState(patient.report.calculus);
  const [bop, setBop] = useState(patient.report.BOP);
  const [save, setSave] = useState(false);
  const [description, setDescription] = useState(
    patient.report.additionalDescription
  );

  useEffect(() => {
    let list = [];
    for (let q of ["UR", "UL", "LR", "LL"]) {
      for (let i = 1; i <= 8; i++) {
        list[q + i.toString()] = {
          defect: false,
          side: [],
          quality: {
            TOP: "",
            dentalCarrier: "",
            pulpTest: "",
            mobility: "",
            elisClass: "",
          },
        };
      }
    }

    for (let tooth of patient.report.tooth) {
      list[tooth.toothName] = {
        defect: true,
        side: tooth.side,
        quality: {
          TOP: tooth.quality.TOP,
          dentalCarrier: tooth.quality.dentalCarrier,
          pulpTest: tooth.quality.pulpTest,
          mobility: tooth.quality.mobility,
          elisClass: tooth.quality.elisClass,
        },
      };
    }

    setToothList(list);
    // eslint-disable-next-line
  }, []);

  async function saveReport() {
    let temp = [];
    for (const [key, value] of Object.entries(toothList)) {
      if (toothList[key].defect)
        temp.push({ toothName: key, quality: value.quality, side: value.side });
    }
    const obj = {
      stain: stain,
      calculus: calculus,
      BOP: bop,
      additionalDescription: description,
      tooth: temp,
    };
    setSave(false);
    const newPatient = await updatePatient(patient.patientid, "report", obj);
    temp = patientList.map((p) => {
      if (p.patientid === patient.patientid) p = newPatient;
      return p;
    });
    setPatients(temp);
    toast.success(`Patient report updated`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }

  function getLabel(text) {
    return text.split(" ")[0].split("")[0] + text.split(" ")[1].split("")[0];
  }

  function getDefective() {
    let temp = [];
    for (const [key, value] of Object.entries(toothList)) {
      if (value.defect) {
        temp.push({
          ...value,
          quadrant:
            qMap[
              key
                .split("")
                .splice(0, key.length - 1)
                .join("")
            ],
          index: key[2],
        });
      }
    }
    return temp;
  }

  if (!toothList) return <InfiniteLoading />;
  return (
    <div className="p-4 w-full printView">
      <div className="flex justify-between pb-4">
        <p className="text-center font-black text-3xl md:text-3xl">
          PATIENT'S MEDICAL REPORT
        </p>
        <button className="removeFromPrint" onClick={() => screenHandler(null)}>
          <AiFillCloseCircle size={28} />
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Patient Name: </p>
          <p>{patient.name}</p>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Patient ID: </p>
          <button
            className="cursor-pointer flex space-x-1 items-center"
            onClick={() => {
              copy(patient.patientid);
              toast.info(`Patient id copied to clipboard`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            <p>{patient.patientid}</p> <AiFillCopy />
          </button>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Patient Email: </p>
          <a
            className="text-blue-500 md:text-black md:hover:text-blue-500"
            href={`mailto:${patient.email}`}
          >
            {patient.email}
          </a>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Mobile Number: </p>
          <a
            className="text-blue-500 md:text-black md:hover:text-blue-500"
            href={`tel:${patient.mobile_number}`}
          >
            {patient.mobile_number}
          </a>
        </div>
        <div className="flex text-lg space-x-2">
          <p className="font-semibold">Current Address: </p>
          <p>{patient.address}</p>
        </div>
        <div className="w-full flex justify-center py-6">
          <img src="/tooth.jpeg" alt="tooth reference" />
        </div>

        <p className="italic pb-2 removeFromPrint">
          Click checkboxes to add defects for each tooth
        </p>
        <p className="text-xl font-bold pb-2">DETAILS</p>
        <div className="flex space-x-3 items-center justify-between w-full md:w-80">
          <p className="text-lg font-medium">Mouth Stain: {stain}</p>
          <input
            type="range"
            min="0"
            max="3"
            value={stain.length === 0 ? "0" : stain}
            onChange={(text) => {
              setSave(true);
              let temp =
                text.target.value.toString() === "0"
                  ? ""
                  : text.target.value.toString();
              setStain(temp);
            }}
          />
        </div>

        <div className="flex space-x-3 items-center justify-between w-full md:w-80">
          <p className="text-lg font-medium">Mouth Calculus: {calculus}</p>
          <input
            type="range"
            min="0"
            max="3"
            value={calculus.length === 0 ? "0" : calculus}
            onChange={(text) => {
              setSave(true);
              let temp =
                text.target.value.toString() === "0"
                  ? ""
                  : text.target.value.toString();
              setCalculus(temp);
            }}
          />
        </div>

        <div className="flex space-x-3 items-center justify-between w-full md:w-80">
          <p className="text-lg font-medium">Mouth BOP: {bop}</p>
          <input
            type="range"
            min="0"
            max="3"
            value={bop.length === 0 ? "0" : bop}
            onChange={(text) => {
              setSave(true);
              let temp =
                text.target.value.toString() === "0"
                  ? ""
                  : text.target.value.toString();
              setBop(temp);
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-start items-start md:items-center w-full">
          <p className="text-lg font-medium pb-2 md:pb-0">
            Additional Description
          </p>
          <input
            className="p-2 border border-1 border-gray-500 rounded w-full md:w-auto"
            type="text"
            value={description}
            onChange={(text) => {
              setSave(true);
              setDescription(text.target.value);
            }}
          />
        </div>
        <p className="text-lg font-semibold pt-4 pb-2 removeFromPrint">
          Select a quadrant from the dropdown
        </p>
        <Select
          defaultValue={{ label: quadrant, value: getLabel(quadrant) }}
          options={quadrants.map((q) => ({ label: q, value: getLabel(q) }))}
          onChange={(e) => {
            setQuadrant(e.label);
          }}
          className="removeFromPrint"
        />

        <div className="py-4 removeFromPrint">
          <p className="text-xl font-semibold">{quadrant} Quadrant</p>
          <div className="font-light italic flex text-sm space-x-1 pt-2">
            <AiFillWarning size={19} color="red" />
            <p>icon indicates that the tooth has a defect</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
              const toothName = getLabel(quadrant) + id.toString();
              // console.log(toothName, toothList[toothName]);
              return (
                <div
                  key={toothName}
                  className="border border-1 p-2 border-gray-500 bg-gray-200 rounded-sm flex justify-between items-center"
                >
                  <p className="font-semibold">Tooth {id}</p>
                  <div className="flex space-x-1 items-center">
                    {toothList[toothName].defect && (
                      <AiFillWarning size={22} color="red" />
                    )}
                    <button
                      onClick={() => {
                        setSelectedTooth(toothName);
                        setModal(true);
                      }}
                      className="px-2 py-1 bg-green-300 rounded"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {modal && selectedTooth && (
          <ToothBox
            setToothList={setToothList}
            toothList={toothList}
            setModal={setModal}
            tooth={toothList[selectedTooth]}
            toothName={selectedTooth}
            setSave={setSave}
          />
        )}
        <p className="font-bold text-2xl pt-3">Final remarks</p>
        {getDefective().length === 0 && <p>No defective tooth present.</p>}
        {getDefective().length !== 0 && (
          <div className="pb-3">
            <p className="font-medium pb-1">Defects have been found in:</p>
            {getDefective().map((tooth, index) => {
              return (
                <div key={index}>
                  Tooth {tooth.index} of {tooth.quadrant} Quadrant in{" "}
                  {tooth.side.map((side, index) => (
                    <p
                      key={tooth.quadrant + side + index}
                      className="italic inline"
                    >
                      {side[0].toUpperCase() +
                        side.split("").splice(1, side.length).join("")}{" "}
                    </p>
                  ))}
                  aspect(s).
                </div>
              );
            })}
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="flex items-center space-x-4 removeFromPrint">
        <button
          disabled={!save}
          className="px-6 py-2 bg-emerald-700 text-white text-xl rounded disabled:bg-emerald-300"
          onClick={saveReport}
        >
          Save
        </button>
        <button
          className="px-6 py-2 bg-yellow-600 text-white text-xl rounded"
          onClick={() => {
            const bodyElement = document.getElementsByTagName("body")[0];
            bodyElement.classList.add("printing");
            window.print();
            bodyElement.classList.remove("printing");
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
