import { compare } from "bcrypt";
import { User } from "../../models/User.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.TOKEN_SECRET_KEY;

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //CHECK IF USER DATA IS EMPTY
    if (!email || !password) {
      return res.status(400).json({
        error: "EmptyInput",
        message: "Invalid login",
      });
    }

    //CHECK IF USER EXISTS
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "NotRegistered",
        message: "Invalid login",
      });
    }

    const enteredPassword = password;
    const hashedPassword = user.password;

    if (!hashedPassword) {
      return res.status(401).json({
        error: "HashError",
        message: "Invalid login",
      });
    }

    //CHECK IF THE ENTERED PASWORD MATCHES WITH THE HASHED ONE FROM DB
    const isPasswordValid = await compare(enteredPassword, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid login",
      });
    }

    //GET ACCESS TOKEN
    const userId = user._id;
    const accessToken = jwt.sign({ userId }, secretKey, {
      expiresIn: "600s",
    });

    if (!accessToken) {
      return res.status(500).json({
        error: "TokenCreationError",
        message: "Error creating access token",
      });
    }

    //SET ACCESS TOKEN INTO COOKIES
    res.cookie("accessToken", accessToken, {
      maxAge: 600 * 1000,
      httpOnly: true,
    });

    //RETURN USER DATA
    res.status(200).json({ email: user.email, userId: user._id });
  } catch (e) {
    next(e);
  }
};
