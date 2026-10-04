import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Navbar from "../components/Navbar";
import ConfirmationBox from "../components/ConfirmationBox";

const Dashboard = () => {
  // Get the logged-in user
  const { user } = useAuth();

  // Store all posts created by the logged-in user
  const [posts, setPosts] = useState([]);

  // Loading state while posts are being fetched
  const [loading, setLoading] = useState(true);

  // Store error messages
  const [error, setError] = useState("");

  // Store the post currently being edited
  const [editingPost, setEditingPost] = useState(null);

  // Store the ID of the post waiting for delete confirmation
  const [deletePostId, setDeletePostId] = useState(null);

  // Store the selected filter for posts
  const [filter, setFilter] = useState("all");

  // Get the logged-in user's posts
  const getMyPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/posts/my");

      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  // Get user's posts when Dashboard loads
  useEffect(() => {
    getMyPosts();
  }, []);

  // Calculate total number of posts
  const totalPosts = posts.length;

  // Calculate number of public posts
  const publicPosts = posts.filter((post) => post.isPublic).length;

  // Calculate number of private posts
  const privatePosts = posts.filter((post) => !post.isPublic).length;

  // Filter posts based on the selected filter
  const filteredPosts = posts.filter((post) => {
    if (filter === "public") {
      return post.isPublic;
    }

    if (filter === "private") {
      return !post.isPublic;
    }

    return true;
  });

  // Add the newly created post to the posts list
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Set the selected post as the post to edit
  const handleEdit = (post) => {
    setEditingPost(post);
  };

  // Delete the selected post
  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);

      setPosts(posts.filter((post) => post._id !== postId));

      setDeletePostId(null);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to delete post.");
    }
  };

  // Replace the old post with the updated post
  const handlePostUpdated = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)),
    );

    // Exit edit mode
    setEditingPost(null);
  };

  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      <div className="page">
        <div className="container">
          {/* Dashboard heading */}
          <div className="dashboard-header">
            <div>
              <h1 className="page-title">Hello, {user.name}</h1>

              <p>Manage your posts from here.</p>
            </div>
          </div>

          {/* Dashboard statistics */}
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

          {/* Create / Edit post form */}
          <PostForm
            onPostCreated={handlePostCreated}
            editingPost={editingPost}
            onPostUpdated={handlePostUpdated}
          />

          {/* My posts heading */}
          <div className="posts-header">
            <h2>My Posts</h2>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Loading message */}
          {loading && <div className="loading">Loading posts...</div>}

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          {/* Show this when the user has no posts */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="empty-state">
              You haven't created any posts yet.
            </div>
          )}

          {/* Display user's posts */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="posts-list">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={(postId) => setDeletePostId(postId)}
                  authorName={user.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Box for Deletion */}
      {deletePostId && (
        <ConfirmationBox
          message="Are you sure you want to delete this post?"
          onConfirm={() => handleDelete(deletePostId)}
          onCancel={() => setDeletePostId(null)}
        />
      )}
    </>
  );
};

export default Dashboard;
