import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      default: "General",
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;