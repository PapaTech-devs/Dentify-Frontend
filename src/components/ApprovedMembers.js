import React from "react";
import ShowUser from "./ShowUser";

export default function ApprovedMembers({ userList }) {
  return (
    <>
      <p className="text-xl font-semibold">Admins</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {userList.length > 0 &&
          userList
            .filter((user) => user.role.includes("admin"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))}
      </div>
      <p className="text-xl font-semibold">Your Doctors</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {userList.length > 0 &&
          userList
            .filter((user) => user.role.includes("doctor"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))}
      </div>
      <p className="text-xl font-semibold">Your Moderators</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {userList.length > 0 &&
          userList
            .filter((user) => user.role.includes("moderator"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))}
      </div>
    </>
  );
}
