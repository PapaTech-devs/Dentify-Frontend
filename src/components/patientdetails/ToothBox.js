import React, { useEffect, useState } from "react";

// TOP -> y/n
// DC -> y/n
// pulp test -> +/-
// mobility -> 1,2,3
// eliss class -> 1,2,3,4,5,6

export default function ToothBox({ setToothList, toothName, setModal, tooth }) {
  const sideList = ["occlusal", "buccal", "lingual", "medial", "distal"];
  const [curr, setCurr] = useState(null);
  const [store, setStore] = useState(null);
  const [current, setCurrent] = useState(
    sideList.map((side) => tooth.side.includes(side))
  );
  const [change, setChange] = useState(false);

  useEffect(() => {
    setCurr(JSON.parse(JSON.stringify(tooth)));
    setStore(JSON.parse(JSON.stringify(tooth)));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (JSON.stringify(curr) !== JSON.stringify(store)) setChange(true);
    else setChange(false);
    // eslint-disable-next-line
  }, [curr]);

  if (!curr) return <></>;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl md:text-3xl font-semibold">
                {toothName} TOOTH DESCRIPTION
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex flex-col space-y-4">
                <p className=" text-lg font-medium">
                  Select Defective Side(s):
                </p>
                {/* <p>{JSON.stringify(curr.side)}</p> */}
                <div className="grid grid-cols-3 gap-2 md:grid-cols-1 ">
                  {sideList.map((side, index) => {
                    return (
                      <div
                        key={side}
                        className="flex space-x-1 w-22 justify-between items-center"
                      >
                        <p>
                          {side[0].toUpperCase() +
                            side.split("").splice(1, side.length).join("")}
                        </p>
                        <input
                          type="checkbox"
                          defaultChecked={current[index]}
                          className="w-5 h-5"
                          onChange={() => {
                            let temp = JSON.parse(JSON.stringify(curr));
                            if (!current[index]) {
                              temp.side.push(side);
                              setCurr(temp);
                            } else {
                              temp.side = temp.side.filter((s) => s !== side);
                              setCurr(temp);
                            }

                            let list = current;
                            list[index] = !list[index];
                            setCurrent(list);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-x-3 items-center">
                  <p className="text-lg font-medium">TOP:</p>
                  <input
                    type="checkbox"
                    defaultChecked={curr.quality.TOP.length !== 0}
                    className="w-6 h-6"
                    onChange={() => {
                      let temp = JSON.parse(JSON.stringify(curr));
                      if (curr.quality.TOP.length === 0) {
                        temp.quality.TOP = "true";
                        setCurr(temp);
                      } else {
                        temp.quality.TOP = "";
                        setCurr(temp);
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-3 items-center">
                  <p className="text-lg font-medium">Dental Carrier:</p>
                  <input
                    type="checkbox"
                    defaultChecked={curr.quality.dentalCarrier.length !== 0}
                    className="w-6 h-6"
                    onChange={() => {
                      let temp = JSON.parse(JSON.stringify(curr));
                      if (curr.quality.dentalCarrier.length === 0) {
                        temp.quality.dentalCarrier = "true";
                        setCurr(temp);
                      } else {
                        temp.quality.dentalCarrier = "";
                        setCurr(temp);
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-3 items-center">
                  <p className="text-lg font-medium">Pulp Test:</p>
                  <input
                    type="checkbox"
                    defaultChecked={curr.quality.pulpTest.length !== 0}
                    className="w-6 h-6"
                    onChange={() => {
                      let temp = JSON.parse(JSON.stringify(curr));
                      if (curr.quality.pulpTest.length === 0) {
                        temp.quality.pulpTest = "true";
                        setCurr(temp);
                      } else {
                        temp.quality.pulpTest = "";
                        setCurr(temp);
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-3 items-center">
                  <p className="text-lg font-medium">
                    Mobility: {curr.quality.mobility}
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={
                      curr.quality.mobility.length === 0
                        ? "0"
                        : curr.quality.mobility
                    }
                    onChange={(text) => {
                      let temp = JSON.parse(JSON.stringify(curr));
                      temp.quality.mobility =
                        text.target.value.toString() === "0"
                          ? ""
                          : text.target.value.toString();
                      setCurr(temp);
                    }}
                  />
                </div>
                <div className="flex space-x-3 items-center">
                  <p className="text-lg font-medium">
                    Elis Class: {curr.quality.elisClass}
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={
                      curr.quality.elisClass.length === 0
                        ? "0"
                        : curr.quality.elisClass
                    }
                    onChange={(text) => {
                      let temp = JSON.parse(JSON.stringify(curr));
                      temp.quality.elisClass =
                        text.target.value.toString() === "0"
                          ? ""
                          : text.target.value.toString();
                      setCurr(temp);
                    }}
                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModal(false)}
              >
                Close
              </button>
              <button
                className={`bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-emerald-300`}
                disabled={!change}
                onClick={() => console.log("current object", curr)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
