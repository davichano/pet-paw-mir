const BASE_URL = "http://localhost:8080/";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}users`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}users/${id}`);
  return response.json();
}

export async function updateUser(id, updatedUser) {
  const response = await fetch(`${BASE_URL}users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return response.json();
}

export async function patchUser(id, updatedFields) {
  const response = await fetch(`${BASE_URL}users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
}
