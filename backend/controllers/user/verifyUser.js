import { User } from "../../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.query;

    //FIND USER VIA TOKEN AND CHANGE VERIFY STATUS TO TRUE
    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true }
    );

    res
      .status(200)
      .json({ status: "Verified", message: "User successfully verified." });
  } catch (e) {
    next(e);
  }
};
