const jwt = require("jsonwebtoken");
const UserAuth = require("../models/user");
const { handleErrorResponse } = require("./errorHandler");


const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return handleErrorResponse(res, 401, "Please login to access this");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserAuth.findById(decoded.id).select("-password");
    if (!req.user) return handleErrorResponse(res, 404, "User not found");
    next();
  } catch (err) {
    console.error(err);
    return handleErrorResponse(res, 401, "Invalid token");
  }
};

module.exports = { authenticateToken };
