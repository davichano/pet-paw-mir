import BASE_URL from '../config';
import { formatPostData } from '../helpers/formatPostData';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const fetchPosts = async (searchParams = {}) => {
  const filteredParams = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => value !== "")
  );
  const query = new URLSearchParams(filteredParams).toString();
  const response = await fetch(`${BASE_URL}api/posts?${query}`, {
    headers: getAuthHeaders(),
  });
  const result = await response.json();
  return result.data;
};

export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}api/posts/${id}`, {
    headers: getAuthHeaders(),
  });
  const result = await response.json();
  return result.data;
}

export async function fetchPostsByUser() {
  const response = await fetch(`${BASE_URL}api/myposts`, {
    headers: getAuthHeaders(),
  });
  const result = await response.json();
  return result.data;
}

export async function createPost(postData) {
  const postDataFormatted = formatPostData(postData);
  const response = await fetch(`${BASE_URL}api/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(postDataFormatted),
  });

  if (!response.ok) {
    console.error('Error al crear el post');
    throw new Error('Error al crear el post');
  }

  const result = await response.json();
  return result.data;
}

export async function updatePost(id, postData, method = "PATCH") {
  const response = await fetch(`${BASE_URL}api/posts/${id}`, {
    method: method,
    headers: getAuthHeaders(),
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el post');
  }

  const result = await response.json();
  return result.data;
}
