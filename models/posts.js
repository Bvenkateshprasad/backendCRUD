const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const postsSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "description is required"],
        lowercase: true,
        trim: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth", // Reference to the User model
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  




module.exports = mongoose.model("posts",postsSchema);
