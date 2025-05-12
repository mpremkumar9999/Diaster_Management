const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const authHeader = req.header('Authorization');
  console.log("Auth Middleware: Received Authorization header:", authHeader);

  if (!authHeader) {
    console.log("Auth Middleware: No token found");
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    console.log("Auth Middleware: Token after removing 'Bearer ':", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth Middleware: Token decoded successfully:", decoded);

    // Fetch full user from DB to get role and more
    const user = await User.findById(decoded.user.id).select('-password');

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

   req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
      district: user.district  // ✅ Add this line
    };
    

    console.log("Auth Middleware: Final user attached to req.user:", req.user);
    next();
  } catch (err) {
    console.error("Auth Middleware: Token verification error:", err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
