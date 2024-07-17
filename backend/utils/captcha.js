import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const site_secret = process.env.SITE_SECRET;

export const captcha = async (req, res, next) => {
  try {
    const { captchaValue } = req.body;

    //CHECK IF CAPTCHA VALUE IS VALID
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${site_secret}&response=${captchaValue}`
    );

    if (!data.success) {
      return res
        .status(400)
        .json({ error: "InvalidCaptcha", message: "Captcha invalid" });
    }
    next();
  } catch (e) {
    next(e);
  }
};
