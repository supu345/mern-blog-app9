const UserModel = require("../models/UserModel.js");
const { DecodeToken } = require("../utility/TokenHelper");

// const isAdmin = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     const decoded = DecodeToken(token);

//     if (decoded.error) {
//       return res.status(401).json({ message: decoded.error });
//     }

//     const user = await UserModel.findById(decoded.user_id);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.role !== "admin") {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized: User is not an admin" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Admin Middleware Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = DecodeToken(token);
    console.log("Decoded Token Content:", decoded);
    if (decoded.error) {
      return res.status(401).json({ message: decoded.error });
    }

    const user = await UserModel.findById(decoded.user_id);
    console.log("User Object Retrieved from DB:", user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: User is not an admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { isAdmin };
