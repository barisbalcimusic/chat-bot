import { hash } from "bcrypt";
import { User } from "../../models/User.js";
import mongoose from "mongoose";
import { transporterFunc, mailOptionsFunc } from "../../utils/mailConfig.js";
import { sendMail } from "../../utils/sendMail.js";

export const register = async (req, res, next) => {
  try {
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

    //CHECK IF USER EXISTS VIA EMAIL
    const userExists = await User.findOne({ email });

    //IF USER ALREADY EXISTS RETURN ERROR
    if (userExists) {
      //409 FOR CONFLICTS
      return res.status(409).json({
        error: "AlreadyRegistered",
        message: "This email adress is already registered.",
      });
    }

    //HASH THE PASSWORD
    const hashedPassword = await hash(password, 12);

    //SAVE USER DATA INTO DB
    const user = await User.create({ email, password: hashedPassword });

    //CHECK FOR ERRORS DURING REGISTRATION
    if (!user)
      res.status(400).json({
        error: "DbError",
        message: "Registration couldn't be completed",
      });

    //SEND CONFIRMATION EMAIL ABOUT REGISTERATION
    const transporter = transporterFunc(email);
    const mailOptions = mailOptionsFunc(email);
    sendMail(transporter, mailOptions);

    //RETURN SUCCESS MESSAGE
    res.status(201).json({ message: "Registration successful" });
  } catch (e) {
    //GET THE TYPE OF VALIDATION ERROR
    let errors = {};
    if (e instanceof mongoose.Error.ValidationError) {
      for (let field in e.errors) {
        errors["error"] = e.errors[field].message;
        next(errors);
        return;
      }
    }
    next(e);
  }
};
