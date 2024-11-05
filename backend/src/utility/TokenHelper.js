const jwt = require("jsonwebtoken");

// Secret key should be stored in environment variables
const SECRET_KEY = process.env.JWT_SECRET || "123-ABC-XYZ";

// Function to encode a token
exports.EncodeToken = (email, user_id, role) => {
  const EXPIRE = "24h"; // Token expiry time
  const PAYLOAD = { email: email, user_id: user_id, role };

  return jwt.sign(PAYLOAD, SECRET_KEY, { expiresIn: EXPIRE });
};

// Function to decode a token
exports.DecodeToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return { error: "Token expired" };
    } else if (e.name === "JsonWebTokenError") {
      return { error: "Invalid token" };
    } else {
      return { error: "Token verification failed" };
    }
  }
};

// // Middleware to check if the user is an admin
// const adminOnly = (req, res, next) => {
//   try {
//     // Assuming you are using JWT for authentication
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userRole = decodedToken.role;

//     if (userRole !== "admin") {
//       return res.status(403).json({ message: "Access denied: Admins only" });
//     }

//     next(); // User is admin, proceed to the next middleware/route handler
//   } catch (error) {
//     return res.status(401).json({ message: "Authentication failed" });
//   }
// };

// module.exports = adminOnly;
