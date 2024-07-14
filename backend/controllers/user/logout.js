export const logout = async (req, res) => {
  try {
    //DELETE COOKIE
    res.clearCookie("accessToken");
    res.status(200).json({ message: "logout successfull" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "LogoutError", message: "Server error on logout" });
  }
};
