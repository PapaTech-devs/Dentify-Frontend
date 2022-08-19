import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/queryDatabase";
import { useAuth } from "../hooks/contextHooks";
import { useUserData } from "../hooks/userHooks";
import ApprovedMembers from "./ApprovedMembers";
import UnapprovedMembers from "./UnapprovedMembers";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";

export default function ShowOrganization() {
  const { authUser } = useAuth();
  const [userData, setUserData] = useUserData();
  const [applicants, setApplicants] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [unApprovedList, setUnapprovedList] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // console.log("fetch users called");
      const list = await getAllUsers();
      setUserData(list);
      setApprovedList(list.filter((user) => user.approved));
      setUnapprovedList(list.filter((user) => !user.approved));
    }
    if (userData.length === 0) fetchUsers();
    else {
      setApprovedList(userData.filter((user) => user.approved));
      setUnapprovedList(userData.filter((user) => !user.approved));
    }
    // console.log("Inside useEffect showorganization");
    //eslint-disable-next-line
  }, [userData]);

  return (
    <div className="w-full h-full md:p-8 p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-2xl md:text-3xl pb-4 md:pb-0 font-bold text-center">
          Suchetan Mondal's Organization
        </p>
        <div className="flex items-center mr-3 space-x-3">
          <p className="md:text-lg">
            Welcome{" "}
            {authUser &&
              `${authUser.role.includes("doctor") ? "Dr." : "Mr."}${
                authUser.name.split(" ")[0]
              }${authUser.role.includes("admin") ? "(Admin)" : ""}`}
          </p>
          {authUser.role.includes("admin") &&
            (!applicants ? (
              <button
                className="md:text-lg py-1 px-2 bg-green-200 rounded flex items-center"
                onClick={() => setApplicants(true)}
              >
                Applicants
                {unApprovedList.length !== 0 && (
                  <BsFillStarFill fill="orange" className="ml-1" />
                )}
              </button>
            ) : (
              <button
                className="md:text-lg py-1 px-2 bg-red-300 rounded flex items-center"
                onClick={() => setApplicants(false)}
              >
                Close
                <AiOutlineClose className="ml-1" />
              </button>
            ))}
        </div>
      </div>
      {!applicants ? (
        <ApprovedMembers userList={approvedList} />
      ) : (
        <UnapprovedMembers userList={unApprovedList} />
      )}
    </div>
  );
}
