import React, { useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { useUserData } from "../hooks/userHooks";
import { deleteUser, updateUser } from "../utils/queryDatabase";

export default function NewApplicants({ user }) {
  const isDoctor = user.role.includes("doctor");
  const [userData, setUserData] = useUserData();
  const [loading, setLoading] = useState(false);

  async function acceptHandler() {
    setLoading(true);
    await updateUser(user.userid, "approved", true);
    const newList = userData.map((tempUser) => {
      if (tempUser.userid === user.userid) {
        tempUser.approved = true;
      }
      return tempUser;
    });
    setUserData(newList);
    setLoading(false);
  }

  async function rejectHandler() {
    setLoading(true);
    await deleteUser(user.userid);
    const newList = userData.filter(
      (tempUser) => tempUser.userid !== user.userid
    );
    setUserData(newList);
    setLoading(false);
  }

  return (
    <div className="bg-gray-100 p-4 rounded-md flex justify-between">
      <div className="w-3/5">
        <p className="text-2xl mb-1">
          {isDoctor ? "Dr." : ""}
          {user.name}
        </p>
        {isDoctor && (
          <p className="text-lg text-gray-600 font-semibold">
            {user.designation}
          </p>
        )}
        <div className="flex items-center space-x-2">
          <AiFillPhone size={20} />
          <p className="text-base">{user.mobile_number}</p>
        </div>
        <div className="flex items-center space-x-2">
          <FiMail size={20} />
          <p className="text-base">{user.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          {user.sex === "male" && <BsGenderMale size={20} />}
          {user.sex === "female" && <BsGenderFemale size={20} />}
          <p className="text-base">{user.sex}</p>
        </div>
      </div>
      <div className="flex space-x-2 items-start">
        <button
          onClick={acceptHandler}
          disabled={loading}
          className={`px-2 py-1 ${
            !loading ? "bg-green-300" : "bg-green-200 text-gray-400"
          } rounded`}
        >
          Accept
        </button>
        <button
          onClick={rejectHandler}
          disabled={loading}
          className={`px-2 py-1 ${
            !loading ? "bg-red-300" : "bg-red-200 text-gray-400"
          } rounded`}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
