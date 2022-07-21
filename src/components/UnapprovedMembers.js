import React from "react";
import NewApplicants from "./NewApplicants";

export default function UnapprovedMembers({ userList }) {
  const doctorsList = userList.filter((user) => user.role.includes("doctor"));
  const moderatorsList = userList.filter((user) =>
    user.role.includes("moderator")
  );
  return (
    <>
      <p className="text-xl font-semibold">Applications for Doctor</p>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
        {doctorsList.length > 0 ? (
          doctorsList.map((user, index) => (
            <NewApplicants user={user} key={`${user.userid + index}`} />
          ))
        ) : (
          <p>None</p>
        )}
      </div>
      <p className="text-xl font-semibold">Applications for Moderator</p>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
        {moderatorsList.length > 0 ? (
          moderatorsList.map((user, index) => (
            <NewApplicants user={user} key={`${user.userid + index}`} />
          ))
        ) : (
          <p>None</p>
        )}
      </div>
    </>
  );
}
