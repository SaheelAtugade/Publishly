const PostCard = ({ post, onEdit, onDelete, authorName }) => {
  return (
    <article className="post-card">
      <div className="post-card-header">
        <div>
          <h2 className="post-title">{post.title}</h2>

          <span className="post-category">{post.category}</span>

          <span className={post.isPublic ? "post-public" : "post-private"}>
            {post.isPublic ? "Public" : "Private"}
          </span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-meta">
        <span>By {post.ownerId?.name || authorName}</span>

        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {onEdit && (
        <div className="post-actions">
          <button className="btn btn-secondary" onClick={() => onEdit(post)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(post._id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default PostCard;
