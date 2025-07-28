const jwt = require("jsonwebtoken");
const { SECRET_AUTH } = require("../config");
const User = require("../../models/userModel");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token;

    if (!token) {
      return response.status(400).json({ error: "invalid or missing token" });
    }

    const decodedToken = jwt.verify(token, SECRET_AUTH);
    if (!decodedToken.id) {
      console.log("✅ Decoded token:", decodedToken);
      return response.status(403).json({ error: "invalid token" });
    }

    const user = await User.findById(decodedToken.id);
    request.user = user;

    next();
  } catch (error) {
    return response.status(500).json({ error: "server error" });
  }
};

module.exports = { tokenExtractor, userExtractor };
