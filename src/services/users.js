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
  const response = await fetch(`http://localhost:8080/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);

  // Verificamos si la respuesta es exitosa
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  // Convertimos la respuesta a JSON
  const users = await response.json();

  return users;
}
