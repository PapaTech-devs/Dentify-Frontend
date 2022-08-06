const URL = "https://dentify001.herokuapp.com";
export async function getUser(uid) {
  // do API requests here
  try {
    const response = await fetch(`${URL}/users/${uid}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    const data = await response.json();
    return data["User"];
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(uid) {
  try {
    await fetch(`${URL}/users/${uid}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
}

export async function storeUser(props) {
  let data = {};
  data["userid"] = props.userid;
  data["name"] = props.fullName;
  data["email"] = props.email;
  data["mobile_number"] = props.mobileNumber;
  data["age"] = props.age;
  data["sex"] = props.sex;
  data["organization"] = props.organization;
  data["role"] = props.role;
  if (props.role.includes("doctor")) {
    data["designation"] = props.designation;
    data["registration_number"] = props.registrationNo;
  }
  try {
    const res = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    return d["user"];
  } catch (err) {
    console.error(err);
  }
}

export async function getAllUsers() {
  try {
    const response = await fetch(`${URL}/users/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(uid, key, value) {
  const data = {};
  data[`${key}`] = value;
  try {
    const response = await fetch(`${URL}/users/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await response.json();
    return d["user"];
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserAppointment(uid, value) {
  try {
    const response = await fetch(`${URL}/users/updateAppointment/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointments: value,
      }),
    });
    const data = await response.json();
    return data["user"];
  } catch (err) {
    console.error(err);
  }
}

//patient queries

export async function getAllUserAppointments(uid) {
  // do API requests here
  try {
    const response = await fetch(`${URL}/users/getAppointments/${uid}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    const data = await response.json();
    return data["appointmentList"];
  } catch (err) {
    console.log(err);
  }
}

export async function getPatient(uid) {
  // do API requests here
  try {
    const response = await fetch(`${URL}/patients/${uid}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    const data = await response.json();
    return data["patient"];
  } catch (err) {
    console.log(err);
  }
}

// export async function deletePatient(uid) {
//   try {
//     await fetch(`${URL}/patients/${uid}`, {
//       method: "DELETE",
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

export async function storePatient(props) {
  let data = {};
  for (let key in props) if (props[key]) data[key] = props[key];

  try {
    const res = await fetch(`${URL}/patients`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    return d["patient"];
  } catch (err) {
    console.error(err);
  }
}

export async function getAllPatients() {
  try {
    const response = await fetch(`${URL}/patients/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function updatePatient(uid, key, value) {
  const data = {};
  data[`${key}`] = value;
  try {
    const response = await fetch(`${URL}/patients/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await response.json();
    return d["patient"];
  } catch (err) {
    console.error(err);
  }
}

export async function deleteAppointment(userid, appointment) {
  try {
    await fetch(`${URL}/users/deleteAppointment/${userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
  } catch (err) {
    console.error(err);
  }
}
