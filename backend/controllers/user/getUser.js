import { compare } from "bcrypt";
import { User } from "../../models/User.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.TOKEN_SECRET_KEY;

export const getUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //CHECK IF USER DATA IS EMPTY
    if (!email || !password) {
      return res.status(400).json({
        error: "EmptyInput",
        message: "Invalid login",
      });
    }

    const user = await User.findOne({ email });

    //CHECK IF USER EXISTS
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

    const userId = user._id;

    const accessToken = jwt.sign({ userId }, secretKey, {
      expiresIn: "30s",
    });

    if (!accessToken) {
      return next(e);
    }
    //SET ACCESS TOKEN INTO COOKIES
    res.cookie("accessToken", accessToken, {
      maxAge: 30,
      httpOnly: true,
    });
    //RETURN USER DATA
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
