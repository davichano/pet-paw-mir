import { useEffect, useState } from "react";
import { fetchPostsByUser } from "../services/posts.js";

export const useGetUserPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPostsByUser();
      setPosts(posts);
    };
    fetchData();
  }, []);
  return { posts };
}
