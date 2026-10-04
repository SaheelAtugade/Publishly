import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Store selected category
  const [category, setCategory] = useState("all");

  // Get all public posts
  const getPublicPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/posts/public");

      setPosts(response.data.posts);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Failed to load posts."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get posts when Feed loads
  useEffect(() => {
    getPublicPosts();
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(posts.map((post) => post.category)),
  ];

  // Filter posts by category
  const filteredPosts = posts.filter((post) => {
    if (category === "all") {
      return true;
    }

    return post.category === category;
  });

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="container">

          <div className="posts-header">
            <h1 className="page-title">
              Latest Posts
            </h1>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "all" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="loading">
              Loading posts...
            </div>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            filteredPosts.length === 0 && (
              <div className="empty-state">
                No posts found.
              </div>
            )}

          {!loading &&
            !error &&
            filteredPosts.length > 0 && (
              <div className="posts-list">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                  />
                ))}
              </div>
            )}

        </div>
      </div>
    </>
  );
};

export default Feed;