import { User } from "../../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    //FIND USER VIA USER ID AND CHANGE VERIFY STATUS TO TRUE
    const user = await User.findOneAndUpdate({ _id: id }, { verified: true });

    res
      .status(200)
      .json({ status: "Verified", message: "User successfully verified." });
  } catch (e) {
    next(e);
  }
};
