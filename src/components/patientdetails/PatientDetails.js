import { AiFillCloseCircle, AiFillCopy, AiFillWarning } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteLoading from "../../utils/InfiniteLoading";
import ToothBox from "./ToothBox";

export default function PatientDetails({ patient, screenHandler }) {
  const [toothList, setToothList] = useState(null);
  const quadrants = ["UR", "UL", "LR", "LL"];
  const [modal, setModal] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState(null);

  useEffect(() => {
    let list = [];
    for (let quadrant of quadrants) {
      for (let i = 1; i <= 8; i++) {
        list[quadrant + i.toString()] = {
          defect: false,
          side: [],
          quality: {
            TOP: null,
            dentalCarrier: null,
            pulpTest: null,
            mobility: null,
            elisClass: null,
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

  if (!toothList) return <InfiniteLoading />;

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between pb-4">
        <p className="text-center font-black text-xl md:text-3xl">
          PATIENT'S MEDICAL REPORT
        </p>
        <button onClick={() => screenHandler(null)}>
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

        <p className="italic">Click checkboxes to add defects for each tooth</p>
        <div className="py-4">
          <p className="text-2xl font-semibold">Right Upper Quadrant</p>
          <div className="font-light italic flex text-sm space-x-1 pt-2">
            <AiFillWarning size={19} color="red" />
            <p>icon indicates that the tooth has a defect</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
              const toothName = "UR" + id.toString();
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
            toothName={selectedTooth}
            setModal={setModal}
            tooth={toothList[selectedTooth]}
          />
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
    </div>
  );
}
