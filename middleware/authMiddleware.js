const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

module.exports = {
  authenticate: async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token" });

    const token = header.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  authorize: (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  },
};
