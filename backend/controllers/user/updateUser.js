import { User } from "../../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const { email, newEmail } = req.body;

    //CHECK IF THE INPUTS ARE EMPTY
    if (!email || !newEmail) {
      return res
        .status(400)
        .json({ error: "MissingEmail", message: "Update data is missing" });
    }

    //UPDATE USERS EMAIL ADRESS
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { email: newEmail },
      { new: true }
    );

    //CHECK FOR ERRORS DURING UPDATE
    if (!updatedUser) {
      return res
        .status(400)
        .json({ error: "UserNotFound", message: "User not found" });
    }

    //RETURN SUCCESS MESSAGE
    res
      .status(200)
      .json({ status: "success", message: "User successfully updated" });
  } catch (e) {
    next(e);
  }
};
