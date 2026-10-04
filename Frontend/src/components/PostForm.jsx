import { useEffect, useState } from "react";
import api from "../services/api";

const PostForm = ({ onPostCreated, editingPost, onPostUpdated }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setCategory(editingPost.category);
      setContent(editingPost.content);
      setIsPublic(editingPost.isPublic);
    } else {
      setTitle("");
      setCategory("");
      setContent("");
      setIsPublic(true);
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // EDIT
      if (editingPost) {
        const response = await api.put(`/posts/${editingPost._id}`, {
          title,
          category,
          content,
          isPublic,
        });

        onPostUpdated(response.data.post);
      }

      // CREATE
      else {
        const response = await api.post("/posts", {
          title,
          category,
          content,
          isPublic,
        });

        onPostCreated(response.data.post);

        setTitle("");
        setCategory("");
        setContent("");
        setIsPublic(true);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-card">
      <h2>{editingPost ? "Edit Post" : "Create Post"}</h2>

      {error && <p className="error-message">{error}</p>}

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Career">Career</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="form-group">
          <label>Content</label>

          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="visibility-field">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />

          <label htmlFor="isPublic">Make this post public</label>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
