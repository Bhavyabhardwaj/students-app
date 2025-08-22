const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
  // ✅ Only check Authorization header
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if(!token) {
    return res.status(401).json({
      success: false,
      message: "No Auth Token provided",
      data: {},
      error: "Not authenticated"
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      email: decoded.email,
      id: decoded.id,
    };
    next();
  } catch (error) {
    console.log(error.name);
    if(error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        data: {},
        error
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid Token provided",
      data: {},
      error
    });
  }
}

module.exports = { isLoggedIn };
