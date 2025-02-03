require("dotenv").config(); // <-- Load environment variables at the top

const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
