import { User } from "../../models/User.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    //DELETE USER
    const userToDelete = await User.deleteOne({ email });

    //CHECK IF USER HAS BEEN DELETED
    if (!userToDelete || !userToDelete.acknowledged)
      res.status(400).json({
        error: "DbError",
        message: "User couldn't be deleted",
      });

    //RETURN SUCCESS MESSAGE
    res.status(200).json({ message: "User successfuly deleted" });
  } catch (e) {
    next(e);
  }
};
