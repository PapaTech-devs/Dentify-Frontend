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
