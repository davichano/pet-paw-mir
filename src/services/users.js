const BASE_URL = "http://localhost:8080/";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}users`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}users/${id}`);
  return response.json();
}

export async function loginUser (username, password) {
  const response = await fetch(`${BASE_URL}users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const users = await response.json();

  return users;
}

export async function createUser (user) {
  const response = await fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
