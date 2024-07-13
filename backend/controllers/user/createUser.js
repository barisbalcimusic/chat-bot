import { hash } from "bcrypt";
import { User } from "../../models/User.js";

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
  } catch (e) {
    next(e);
  }
};
