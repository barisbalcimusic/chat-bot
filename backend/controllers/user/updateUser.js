import { User } from "../../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const { email, newEmail } = req.body;

    console.log(email, newEmail);

    if (!email || !newEmail) {
      return res
        .status(400)
        .json({ error: "MissingEmail", message: "Update data is missing" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(400)
        .json({ email: "UserNotFound", message: "User not found" });
    }

    res.status(200).json({ message: "User successfully updated" });
  } catch (e) {
    next(e);
  }
};
