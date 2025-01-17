const { handleErrorResponse } = require("../middlewares/errorHandler");
const UserAuth = require("../models/user");

// Get authenticated user's profile
const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Authenticated user from token
    res.status(200).json({        status:true,

      message: "User profile retrieved successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error retrieving profile");
  }
};
const getUserProfilebyId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserAuth.findById(id);
        if (!user) return handleErrorResponse(res, 404, "User not found");

      res.status(200).json({        status:true,

        message: "User profile retrieved successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt
        },
      });
    } catch (err) {
      console.error(err);
      handleErrorResponse(res, 500, "Server error while retrieving profile");
    }
  };
// Update the authenticated user's profile
const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = req.user; // Authenticated user from token
    if (username) user.username = username;
    if (email) user.email = email;

    const updatedUser = await user.save();

    res.status(200).json({        status:true,

      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error updating profile");
  }
};

module.exports = { getUserProfile, updateUserProfile ,getUserProfilebyId};
