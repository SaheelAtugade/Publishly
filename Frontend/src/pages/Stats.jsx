import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Stats = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get logged-in user's posts
  const getMyPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/posts/my");

      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  // Total posts
  const totalPosts = posts.length;

  // Public posts
  const publicPosts = posts.filter((post) => post.isPublic).length;

  // Private posts
  const privatePosts = posts.filter((post) => !post.isPublic).length;

  // Count posts by category
  const categoryStats = {};

  posts.forEach((post) => {
    if (categoryStats[post.category]) {
      categoryStats[post.category]++;
    } else {
      categoryStats[post.category] = 1;
    }
  });

  // Count posts by month
  const monthlyStats = {};

  posts.forEach((post) => {
    const date = new Date(post.createdAt);

    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (monthlyStats[month]) {
      monthlyStats[month]++;
    } else {
      monthlyStats[month] = 1;
    }
  });

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="page">
          <div className="container">
            <div className="loading">Loading statistics...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="container">
          <h1 className="page-title">Stats</h1>

          {error && <p className="error-message">{error}</p>}

          {/* Overview */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <p className="dashboard-card-title">Total Posts</p>

              <p className="dashboard-card-value">{totalPosts}</p>
            </div>

            <div className="dashboard-card">
              <p className="dashboard-card-title">Public Posts</p>

              <p className="dashboard-card-value">{publicPosts}</p>
            </div>

            <div className="dashboard-card">
              <p className="dashboard-card-title">Private Posts</p>

              <p className="dashboard-card-value">{privatePosts}</p>
            </div>
          </div>

          {/* Category Statistics */}
          <div className="stats-section">
            <h2 className="stats-section-title">Posts by Category</h2>

            {Object.keys(categoryStats).length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              Object.entries(categoryStats).map(([category, count]) => (
                <div className="stats-row">
                  <span className="stats-label">{category}</span>
                  <span className="stats-value">{count}</span>
                </div>
              ))
            )}
          </div>

          {/* Visibility Statistics */}
          <div className="stats-section">
            <h2 className="stats-section-title">Visibility</h2>

            <p>Public: {publicPosts}</p>

            <p>Private: {privatePosts}</p>
          </div>

          {/* Publishing Activity */}
          <div className="stats-section">
            <h2 className="stats-section-title">Publishing Activity</h2>

            {Object.keys(monthlyStats).length === 0 ? (
              <p>No activity yet.</p>
            ) : (
              Object.entries(monthlyStats).map(([month, count]) => (
                <div className="stats-row">
                  <span className="stats-label">{month}</span>
                  <span className="stats-value">{count} posts</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
