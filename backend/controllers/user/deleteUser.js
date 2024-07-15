import { User } from "../../models/User.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userToDelete = await User.deleteOne({ email });

    console.log(userToDelete);
  } catch (e) {
    next(e);
  }
};
