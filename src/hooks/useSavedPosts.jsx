// useSavedPosts.jsx
import { useEffect, useState } from "react";
import { fetchSavedPosts } from "../services/savedPosts.js";

export const useSavedPosts = ({ userId }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId !== undefined) {
        const posts = await fetchSavedPosts(userId);
        setSavedPosts(posts);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { savedPosts, loading };
};
