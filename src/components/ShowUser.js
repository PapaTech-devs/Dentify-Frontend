import React, { useState } from "react";
import { AiFillPhone, AiOutlineCloseCircle } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import Select from "react-select";
import { useAuth } from "../hooks/contextHooks";
import { useUserData } from "../hooks/userHooks";
import { updateUser } from "../utils/queryDatabase";

export default function ShowUser({ user }) {
  const roleList = ["doctor", "moderator", "admin"];
  const { authUser, setAuthUser } = useAuth();
  const isDoctor = user.role.includes("doctor");
  const myRoles = user.role;
  const [roleChange, setRoleChange] = useState(false);
  const [newRoles, setNewRoles] = useState([]);
  const [userData, setUserData] = useUserData();
  const [error, setError] = useState(null);

  return (
    <div className="bg-gray-100 p-4 rounded-md flex justify-between md:flex-row flex-col space-y-2 md:space-y-0">
      <div className="md:w-3/5">
        <p className="text-2xl mb-1">
          {isDoctor ? "Dr." : ""}
          {user.name}
        </p>
        {isDoctor && (
          <p className="md:text-lg text-gray-600 font-semibold">
            {user.designation}
          </p>
        )}
        <div className="flex items-center space-x-2 w-fit">
          <AiFillPhone size={20} />
          <p className="text-base">{user.mobile_number}</p>
        </div>
        <div className="flex items-center space-x-2 w-fit">
          <FiMail size={20} />
          <p className="text-base">{user.email}</p>
        </div>
      </div>
      <div className="md:w-2/5 space-y-1">
        <p className="text-xl font-semibold mb-2">Roles</p>
        {error && <p className="text-red-500 font-semibold text-sm">{error}</p>}
        {authUser.role.includes("admin") ? (
          <Select
            isMulti
            isClearable={false}
            isSearchable={false}
            onChange={(text) => {
              let arr = text.map((data) => data.value);
              if (arr.length === 0) {
                setError("User without a role cannot exist.");
              } else {
                setError(null);
                if (arr.toString() !== myRoles.toString()) {
                  setRoleChange(true);
                  setNewRoles(arr);
                } else {
                  setRoleChange(false);
                  setNewRoles([]);
                }
              }
            }}
            value={user.role.map((role) => {
              return {
                value: role,
                label:
                  role[0].toUpperCase() +
                  role.split("").splice(1, role.length).join(""),
              };
            })}
            options={roleList.map((role) => ({
              value: role,
              label:
                role[0].toUpperCase() +
                role.split("").splice(1, role.length).join(""),
            }))}
          />
        ) : (
          <div className="flex space-x-2">
            {user.role.map((role, index) => (
              <p key={index}>
                {role[0].toUpperCase() +
                  role.split("").splice(1, role.length).join("") +
                  (index < user.role.length - 1 ? "," : "")}
              </p>
            ))}
          </div>
        )}
        {roleChange && (
          <div className="flex space-x-2 items-center pt-3">
            <button
              onClick={async () => {
                if (user.userid === authUser.userid) {
                  const tempAuthUser = authUser;
                  tempAuthUser.role = newRoles;
                  setAuthUser(tempAuthUser);
                }
                const newList = userData.map((tempuser) => {
                  if (tempuser.userid === user.userid) {
                    tempuser.role = newRoles;
                  }
                  return tempuser;
                });
                await updateUser(user.userid, "role", newRoles);
                setUserData(newList);
                setNewRoles([]);
                setRoleChange(false);
              }}
              className={`px-2 py-1 ${
                user.role < newRoles ? "bg-green-500" : "bg-red-500"
              } text-white rounded-sm text-sm`}
            >
              {user.role < newRoles ? "Add role" : "Remove Role"}
            </button>
            <div className="flex space-x-2 pt-1 items-center">
              {user.role < newRoles
                ? newRoles
                    .filter((temprole) => !user.role.includes(temprole))
                    .map((role, index) => (
                      <p key={index}>
                        {role[0].toUpperCase() +
                          role.split("").splice(1, role.length).join("")}
                      </p>
                    ))
                : user.role
                    .filter((temprole) => !newRoles.includes(temprole))
                    .map((role, index) => (
                      <p key={index}>
                        {role[0].toUpperCase() +
                          role.split("").splice(1, role.length).join("")}
                      </p>
                    ))}
              <button
                onClick={() => {
                  setNewRoles([]);
                  setRoleChange(false);
                }}
              >
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
