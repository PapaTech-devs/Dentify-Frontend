// const users = require("../data/mockDatabase");
// const URL = process.env.REACT_APP_BACKEND_URL;
export async function getUser(uid) {
  // do API requests here
  try {
    const response = await fetch(`/users/${uid}`, {
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

export async function getAllUsers() {
  const response = await fetch("/users/");
  const data = await response.json();
  return data;
}

export async function updateUser(uid, key, value) {
  console.log(key, value);
  const response = await fetch(`/users/${uid}`, {
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
}
