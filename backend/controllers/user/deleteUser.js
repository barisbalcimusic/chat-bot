import { User } from "../../models/User.js";
import { Conversation } from "../../models/Conversation.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    //DELETE USER
    const userToDelete = await User.deleteOne({ _id: userId });

    //CHECK IF USER HAS BEEN DELETED
    if (!userToDelete || !userToDelete.acknowledged)
      res.status(400).json({
        error: "DbError",
        message: "User couldn't be deleted",
      });

    const deleteMessages = await Conversation.deleteMany({ userId });

    //CHECK IF MESSAGES HAVE BEEN DELETED
    if (!deleteMessages || !deleteMessages.acknowledged)
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
