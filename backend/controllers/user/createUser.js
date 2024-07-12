import { User } from "../models/User.js";

const registerUser = async (req, res, next) => {
  try {
    //TAKE USER DATA FROM BODY
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing login data" });
    }
    //HASH THE PASSWORD
    //...

    //SAVE USER DATA INTO DB
    const user = await User.create({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Login failed" });
    }

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
