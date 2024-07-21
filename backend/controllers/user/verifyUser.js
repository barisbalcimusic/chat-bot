import { User } from "../../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.query;

    //IF VERIFICATION TOKEN IS INVALID
    if (!token) {
      return res.status(401).json({
        error: "InvalidVerificationToken",
        message: "Invalid verification token",
      });
    }

    //FIND USER VIA TOKEN AND CHANGE VERIFY STATUS TO TRUE
    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true },
      {
        new: true,
      }
    );

    //IF USER COULDN'T FIND
    if (!user) {
      return res.status(400).json({
        error: "UserNotFound",
        message: "User not found",
      });
    }

    //RETURN A SUCCESS MESSAGE
    res
      .status(200)
      .json({ status: "Verified", message: "User successfully verified." });
  } catch (e) {
    next(e);
  }
};
