// backend/utils/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization'); // Use Authorization header
  console.log("Backend Middleware: Received Authorization header:", token);

  if (!token) {
    console.log("Backend Middleware: No token found");
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const tokenString = token.replace('Bearer ', ''); // Remove 'Bearer ' if present
    console.log("Backend Middleware: Token after removing 'Bearer ':", tokenString);
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    console.log("Backend Middleware: Token decoded successfully:", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Backend Middleware: Token verification error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
