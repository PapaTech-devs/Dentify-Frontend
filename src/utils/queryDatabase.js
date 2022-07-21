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
  try {
    const response = await fetch(`${URL}/users/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: value,
      }),
    });
    const data = await response.json();
    return data["user"];
  } catch (err) {
    console.error(err);
  }
}
