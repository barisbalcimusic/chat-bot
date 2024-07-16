import nodemailer from "nodemailer";

const sendVerificationMail = () => {
  const transporter = nodemailer.createTransport({
    host: "www.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      senderEmail: "chatbotbybaris@gmail.com",
      senderPass: "chatbot2024",
    },
  });

  const mailOptions = {
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

sendVerificationMail();
