const BASE_URL = "http://localhost:8080/";

export const fetchPosts = async (searchParams = {}) => {
  const filteredParams = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => value !== "")
  );
  const query = new URLSearchParams(filteredParams).toString();
  const response = await fetch(`${BASE_URL}posts?${query}`);
  return await response.json();
};

export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}posts/${id}`);
  return response.json();
}

export async function fetchPostsByUser(id) {
  const response = await fetch(`${BASE_URL}users/${id}/posts`);
  return response.json();
}


export async function createPost(postData) {
  const response = await fetch(`${BASE_URL}posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Error al crear el post');
  }

  return response.json(); // Retornar la respuesta del servidor
}

export async function updatePost(id, postData) {
  const response = await fetch(`${BASE_URL}posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el post');
  }

  return response.json();
}
