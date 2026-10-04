import postModel from "../models/posts.model.js";


// CREATE POST
export const createPost = async (req, res) => {
  try {
    const {
      title,
      category,
      content,
      isPublic,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required.",
      });
    }

    const post = await postModel.create({
      ownerId: req.user._id,
      title,
      category: category || "General",
      content,
      isPublic: Boolean(isPublic),
    });

    res.status(201).json({
      message: "Post created successfully.",
      post,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
};


// get all public posts
export const getPublicPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ isPublic: true })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
};


// get only logged-in user's posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ ownerId: req.user._id })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
};


// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      category,
      content,
      isPublic,
    } = req.body;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found.",
      });
    }

    // Only owner can update
    if (
      post.ownerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        error: "You can only edit your own posts.",
      });
    }

    if (title !== undefined) {
      post.title = title;
    }

    if (category !== undefined) {
      post.category = category;
    }

    if (content !== undefined) {
      post.content = content;
    }

    if (isPublic !== undefined) {
      post.isPublic = Boolean(isPublic);
    }

    await post.save();

    res.json({
      message: "Post updated successfully.",
      post,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
};


// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found.",
      });
    }

    // Only owner can delete
    if (
      post.ownerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        error: "You can only delete your own posts.",
      });
    }

    await postModel.findByIdAndDelete(id);

    res.json({
      message: "Post deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
};