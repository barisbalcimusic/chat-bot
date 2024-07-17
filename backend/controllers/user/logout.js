export const logout = async (req, res, next) => {
  try {
    //DELETE COOKIE
    res.clearCookie("accessToken");

    //RETURN SUCCESS MESSAGE
    res.status(200).json({ message: "logout successfull" });
  } catch (e) {
    next(e);
  }
};
