import React, { useState } from "react";
import Select from "react-select";
import Calendar from "react-calendar";
import ShowAppoinments from "./Appoinments";
import "react-calendar/dist/Calendar.css";
import { useUserData } from "../hooks/userHooks";
import { useAuth } from "../hooks/contextHooks";

export default function ShowCalendar() {
  const [userData] = useUserData();
  const { authUser } = useAuth();
  const [cdate, onChange] = useState(new Date());
  const [cuser, setUser] = useState(authUser);

  // console.log("list of users: ", userData);

  // console.log("cuser: ", cuser);

  let Options = [];
  if (!authUser.role.includes("moderator")) {
    // console.log("Users other than a moderator view");
    let singleOption = {};
    singleOption["value"] = authUser.userid;
    singleOption["label"] = authUser.name;
    Options.push(singleOption);
  } else
    userData.map((user, index) => {
      // console.log("Index", index);
      if (user.role.includes("doctor") || user.role.includes("admin")) {
        // console.log("moderator view");
        let singleOption = {};
        singleOption["value"] = user.userid;
        singleOption["label"] = user.name;
        Options.push(singleOption);
      }
      return 0;
    });

  let selectedUserData = userData.find((user) => {
    return user.userid === cuser.value || user.userid === cuser.userid;
  });
  let selectedUserAppointments = selectedUserData.appointments;
  // console.log("selectedUserData", selectedUserData);
  // let selectedUserAppointments = selectedUserData.appointments;
  // console.log("userOptions", Options);
  // console.log("current user", authUser.name);
  return (
    <div className="grid-cols-1 gap-5 inline-grid px-14 md:grid-cols-2 p-4">
      <div className="flex items-center flex-col space-y-3">
        <Select
          className="w-full"
          defaultValue={Options[0]}
          // isDisabled={isDisabled}
          // isLoading={isLoading}
          isClearable={false}
          // isRtl={isRtl}
          isSearchable={true}
          // name="color"
          options={Options}
          onChange={(e) => setUser(e)}
        />
        <Calendar
          onChange={onChange}
          value={cdate}
          className="react-calendar"
        />
      </div>
      <div>
        <ShowAppoinments
          selectedDate={cdate}
          userAppointments={selectedUserAppointments}
          selectedUser={selectedUserData}
        />
      </div>
    </div>
  );
}
