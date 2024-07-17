export const sendMail = async (transporter, mailOptions) => {
  try {
    //SEND MAIL
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
