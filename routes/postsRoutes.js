const express = require("express");
const {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getUserPosts,
} = require("../controllers/postsController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a post (authenticated user)
router.post("/", authenticateToken, createPost);

// Edit a post (authenticated user)
router.put("/:id", authenticateToken, editPost);

// Delete a post (authenticated user)
router.delete("/:id", authenticateToken, deletePost);

// Get all posts (public access)
router.get("/", getAllPosts);

// Get posts by the authenticated user
router.get("/my-posts", authenticateToken, getUserPosts);

module.exports = router;
