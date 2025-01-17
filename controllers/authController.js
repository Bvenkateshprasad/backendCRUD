const UserAuth = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const { handleErrorResponse } = require("../middlewares/errorHandler");
const jwt = require('jsonwebtoken');

// Register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await UserAuth.findOne({ email });
    if (userExists) return handleErrorResponse(res, 400, "User already exists");

    const user = await UserAuth.create({ username, email, password });

    res.status(201).json({        status:true,

      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error during registration");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserAuth.findOne({ email });
    if (!user) return handleErrorResponse(res, 400, "Invalid email or password");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return handleErrorResponse(res, 400, "Invalid email or password");

    res.status(200).json({        status:true,

      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    handleErrorResponse(res, 500, "Error during login");
  }
};
const logoutUser = async (req, res) => {
  try {
   
      const { user, language } = req;
      const { id } = user;
      await UserAuth.updateOne({ _id: id }, { $set: { deviceToken: null } });
      res.status(201).json({       
      status:true,
      message: "User logged out successfully",
      });
 
  } catch (err) {
    console.error("Error during logout:", err);
    handleErrorResponse(res, 500, "Error during logout");
  }
};



module.exports = { registerUser, loginUser, logoutUser };
