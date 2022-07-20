import React from "react";
import ShowUser from "./ShowUser";

export default function UnapprovedMembers({ userList }) {
  return (
    <>
      <p className="text-xl font-semibold">Applications for Doctor</p>
      <div className="grid gap-4 grid-cols-2">
        {userList.length > 0 ? (
          userList
            .filter((user) => user.role.includes("doctor"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))
        ) : (
          <p>None</p>
        )}
      </div>
      <p className="text-xl font-semibold">Applications for Moderator</p>
      <div className="grid gap-4 grid-cols-2">
        {userList.length > 0 ? (
          userList
            .filter((user) => user.role.includes("moderator"))
            .map((user, index) => (
              <ShowUser user={user} key={`${user.userid + index}`} />
            ))
        ) : (
          <p>None</p>
        )}
      </div>
    </>
  );
}
