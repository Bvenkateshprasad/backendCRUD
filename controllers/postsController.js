const Posts = require("../models/posts");
const { handleErrorResponse } = require("../middlewares/errorHandler");

// Create a new post
const createPost = async (req, res) => {
  const { title, description } = req.body;

  try {
    const user = req.user; // Authenticated user from token

    const newPost = new Posts({
      title,
      description,
      user: user._id, // Associate the post with the authenticated user
    });

    const savedPost = await newPost.save();

    res.status(201).json({        status:true,

      message: "Post created successfully",
      post: savedPost,
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error creating post");
  }
};

// Edit a post
const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const user = req.user; // Authenticated user from token

    const post = await Posts.findById(id);

    if (!post) return handleErrorResponse(res, 404, "Post not found");
    if (post.user.toString() !== user._id.toString())
      return handleErrorResponse(res, 403, "You are not authorized to edit this post");

    if (title) post.title = title;
    if (description) post.description = description;

    const updatedPost = await post.save();

    res.status(200).json({        status:true,

      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error updating post");
  }
};

// Delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = req.user; // Authenticated user from token
  
      const post = await Posts.findById(id);
      if (!post) return handleErrorResponse(res, 404, "Post not found");
      if (post.user.toString() !== user._id.toString())
        return handleErrorResponse(res, 403, "You are not authorized to delete this post");
  
      // Delete the post directly
      await Posts.findByIdAndDelete(id);
  
      res.status(200).json({
        status:true,
        message: "Post deleted successfully",
      });
    } catch (err) {
      console.error(err);
      handleErrorResponse(res, 500, "Error deleting post");
    }
  };
  
// Get all posts (publicly accessible)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find().populate("user", "username email");

    res.status(200).json({
        status:true,
      message: "All posts retrieved successfully",
      postsLength:posts.length,
      posts,
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error retrieving posts");
  }
};

// Get posts by the authenticated user
const getUserPosts = async (req, res) => {
  try {
    const user = req.user; // Authenticated user from token

    const posts = await Posts.find({ user: user._id });

    res.status(200).json({        status:true,

      message: "User posts retrieved successfully",
      postsLength:posts.length,
      posts,
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error retrieving user posts");
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getUserPosts,
};
