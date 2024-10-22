import BASE_URL from '../config';

export async function fetchCommentsByPost(postId) {
  const response = await fetch(`${BASE_URL}comments?post_id=${postId}`);
  return response.json();
}

export async function createComment(commentData) {
  const response = await fetch(`${BASE_URL}comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  return response.json();
}
