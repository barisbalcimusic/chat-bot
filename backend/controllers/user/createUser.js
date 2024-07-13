import { hash } from "bcrypt";
import { User } from "../../models/User.js";

export const createUser = async (req, res, next) => {
  try {
    //TAKE USER DATA FROM BODY
    const { email, password } = req.body;
    //CHECK IF USER DATA IS EMPTY
    if (!email || !password) {
      return res.status(400).json({ message: "Missing login data" });
    }
    //HASH THE PASSWORD
    const hashedPassword = await hash(password, 12);

    //SAVE USER DATA INTO DB
    const user = await User.create({ email, password: hashedPassword });

    if (!user) {
      return res.status(400).json({ message: "Login failed" });
    }

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
