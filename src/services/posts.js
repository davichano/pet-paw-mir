import BASE_URL from '../config';
import {formatPostData} from '../helpers/formatPostData';

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

export async function fetchPostsByUser() {
  const response = await fetch(`${BASE_URL}myposts`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();

}


export async function createPost(postData) {

  console.log('postDataFormatted:', formatPostData(postData));

  const postDataFormatted = formatPostData(postData);

  const response = await fetch(`${BASE_URL}posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(postDataFormatted),
  });

  if (!response.ok) {
    console.log('Error al crear el post');
    throw new Error('Error al crear el post');
  }

  return response.json(); // Retornar la respuesta del servidor
}

export async function updatePost(id, postData, method = "PATCH") {
  const response = await fetch(`${BASE_URL}posts/${id}`, {
    method: method,
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
