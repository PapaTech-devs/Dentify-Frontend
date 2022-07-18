import React, { useEffect } from "react";
import { getAllUsers } from "../utils/queryDatabase";
import { useAuth } from "../hooks/contextHooks";
import ShowUser from "./ShowUser";
import { useUserData } from "../hooks/userHooks";

export default function ShowOrganization() {
  const { authUser } = useAuth();
  const [userData, setUserData] = useUserData();

  useEffect(() => {
    async function fetchUsers() {
      const list = await getAllUsers();
      setUserData(list);
    }
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full p-8 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">Tulip Medical Organization</p>
        <p className="text-lg mr-3">
          Welcome{" "}
          {authUser &&
            `${authUser.role.includes("doctor") ? "Dr." : "Mr."}${
              authUser.name.split(" ")[0]
            }${authUser.role.includes("admin") ? "(Admin)" : ""}`}
        </p>
      </div>
      <p className="text-xl font-semibold">Your Doctors</p>
      <div className="grid gap-4 grid-cols-2">
        {userData.length > 0 &&
          userData
            .filter((user) => user.role.includes("doctor"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))}
      </div>
      <p className="text-xl font-semibold">Your Moderators</p>
      <div className="grid gap-4 grid-cols-2">
        {userData.length > 0 &&
          userData
            .filter((user) => user.role.includes("moderator"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))}
      </div>
    </div>
  );
}
