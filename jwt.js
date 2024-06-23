const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  // First check request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token not found😢." });
  }
  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token." });
  }
};

// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new token using userdata
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};
module.exports = { jwtAuthMiddleware, generateToken };
