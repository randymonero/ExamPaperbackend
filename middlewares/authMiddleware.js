const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  // Check for token in headers or cookies
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

// authMiddleware.js

exports.isAdmin = (req, res, next) => {
  // Check if user is admin based on role or any other criteria
  if (req.userId !== 'adminId') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
};

console.log("here is the middleware");