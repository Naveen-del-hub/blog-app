import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  console.log("authMiddleware HIT", req.method, req.originalUrl);

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    console.log("Verifying token:", token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // pass control to blogsController
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
