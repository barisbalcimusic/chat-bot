import { hash } from "bcrypt";
import { User } from "../../models/User.js";
import mongoose from "mongoose";

export const createUser = async (req, res, next) => {
  try {
    //TAKE USER DATA FROM BODY
    const { email, password } = req.body;
    //CHECK IF USER DATA IS EMPTY
    if (!email || !password) {
      return res.status(400).json({
        error: "EmptyInput",
        message: "Email and password mustn't be empty",
      });
    }
    //LENGTH VALIDATION HERE BACAUSE OF HASHING
    if (password.length < 8) {
      return res.status(400).json({
        error: "InvalidLength",
        message: "Password must have at least 8 characters",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "AlreadyRegistered",
        message: "This email adress is already registered.",
      });
    }

    //HASH THE PASSWORD
    const hashedPassword = await hash(password, 12);

    //SAVE USER DATA INTO DB
    const user = await User.create({ email, password: hashedPassword });

    if (!user)
      res.status(400).json({ error: "DbError", message: "Login failed" });

    res.status(200).json(user);
  } catch (error) {
    let errors = {};
    if (error instanceof mongoose.Error.ValidationError) {
      //FIND THE ERROR TYPE
      for (let field in error.errors) {
        errors["error"] = error.errors[field].message;
        next(errors);
        return;
      }
    }
    next(error);
  }
};
