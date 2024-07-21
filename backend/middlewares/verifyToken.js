import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.TOKEN_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  try {
    //GET COOKIES FROM REQUEST OBJECT
    const accessToken = req.cookies["accessToken"];

    console.log(accessToken);

    //CHECK IF ACCESSTOKEN IS EMPTY
    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid token" });
    }

    //CHECK IF ACCESSTOKEN IS VALID
    jwt.verify(accessToken, secretKey, (error, decoded) => {
      if (error) {
        return next(error);
      }
      //ADD USER DATA TO REQ OBJECT
      req.user = decoded;
      next();
    });
  } catch (e) {
    next(e);
  }
};
