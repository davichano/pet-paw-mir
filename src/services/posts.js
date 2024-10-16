const BASE_URL = "http://localhost:3000/";
import {formatPostData} from '../helpers/formatPostData';

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}api/posts`);
  return response.json();
}

export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}api/posts/${id}`);
  return response.json();
}

export async function fetchPostsByUser() {
//  const response = await fetch(`http://localhost:8080/users/${id}/posts`);
  const response = await fetch(`http://localhost:3000/api/posts/myposts`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();

}


export async function createPost(postData) {

  console.log('postDataFormatted:', formatPostData(postData));

  const postDataFormatted = formatPostData(postData);

  const response = await fetch(`${BASE_URL}api/posts`, {
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

