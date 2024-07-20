import { User } from "../../models/User.js";
import { Conversation } from "../../models/Conversation.js";
import { compare } from "../../utils/crypto.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    //FIND USER
    const user = await User.findOne({ _id: userId });

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
        message: "Messages couldn't be deleted",
      });

    //RETURN SUCCESS MESSAGE
    res.status(200).json({ message: "User and messages successfuly deleted" });
  } catch (e) {
    next(e);
  }
};
