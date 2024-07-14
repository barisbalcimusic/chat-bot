import jwt from "jsonwebtoken";

const secretKey = process.env.TOKEN_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];

  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Invalid token" });
  }

  jwt.verify(accessToken, secretKey, (error, decoded) => {
    if (error) {
      return next(error);
    }
    //* we add user data to req object
    req.user = decoded;
    next();
  });
};
