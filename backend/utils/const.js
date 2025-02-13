export const { NODE_ENV, JWT_SECRET } = process.env;
export const token = jwt.sign(
  { _id: user._id },
  NODE_ENV === "production" ? JWT_SECRET : "loquesea"
);

export const allowedOrigins = [
  "http://ogg.deltako.com",
  "http://www.ogg.deltako.com",
  "https://ogg.deltako.com",
  "https://www.mogg.deltako.com",
  "http://localhost:3000",
  "https://localhost:3000",
];
