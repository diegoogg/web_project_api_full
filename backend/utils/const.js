const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

const allowedOrigins = [
  "http://ogg.deltako.com",
  "http://www.ogg.deltako.com",
  "https://ogg.deltako.com",
  "https://www.ogg.deltako.com",
  "http://localhost:3000",
  "https://localhost:3000",
];

module.exports = { NODE_ENV, JWT_SECRET, allowedOrigins, token };
