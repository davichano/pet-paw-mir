import BASE_URL from '../config';

export async function fetchSavedPosts(userId) {
  const res = await fetch(`${BASE_URL}saved_posts?user_id=${userId}`);
  if (!res.ok) {
    throw new Error(`Error fetching saved posts: ${res.statusText}`);
  }
  return await res.json();
}

export async function savePost(userId, postId) {
  const dataToSend = {
    user_id: userId,
    post_id: postId,
    created_at: new Date().toISOString()
  };
  const res = await fetch(`${BASE_URL}saved_posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error al guardar el post:', errorText);
    throw new Error('Error al guardar el post');
  }
  return await res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}saved_posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
