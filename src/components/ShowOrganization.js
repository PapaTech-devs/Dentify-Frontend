import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/queryDatabase";
import { useAuth } from "../hooks/contextHooks";
import { useUserData } from "../hooks/userHooks";
import ApprovedMembers from "./ApprovedMembers";
import UnapprovedMembers from "./UnapprovedMembers";
import { AiFillWarning, AiOutlineClose } from "react-icons/ai";

export default function ShowOrganization() {
  const { authUser } = useAuth();
  const [userData, setUserData] = useUserData();
  const [applicants, setApplicants] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [unApprovedList, setUnapprovedList] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
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
    //eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full p-8 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">Tulip Medical Organization</p>
        <div className="flex items-center mr-3 space-x-3">
          <p className="text-lg">
            Welcome{" "}
            {authUser &&
              `${authUser.role.includes("doctor") ? "Dr." : "Mr."}${
                authUser.name.split(" ")[0]
              }${authUser.role.includes("admin") ? "(Admin)" : ""}`}
          </p>
          {!applicants ? (
            <button
              className="text-lg py-1 px-2 bg-green-300 rounded flex items-center"
              onClick={() => setApplicants(true)}
            >
              Applicants
              {unApprovedList.length !== 0 && (
                <AiFillWarning fill="red" className="ml-1" />
              )}
            </button>
          ) : (
            <button
              className="text-lg py-1 px-2 bg-red-300 rounded flex items-center"
              onClick={() => setApplicants(false)}
            >
              Close
              <AiOutlineClose className="ml-1" />
            </button>
          )}
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
