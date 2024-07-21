import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sender = process.env.EMAIL;
const password = process.env.APP_PASSWORD;

//EMAIL CONFIGURATION
export const transporterFunc = (receiver) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: sender,
      pass: password,
    },
  });
  return transporter;
};

//MAIL OPTIONS
export const mailOptionsFunc = (receiver, verificationToken) => {
  const mailOptions = {
    from: sender,
    to: receiver,
    subject: "Welcome on ChatBot!",
    html: `
        <html>
        <head>
            <style>
                h1 { color: #333; }
                h2 { color: #555; }
                p { font-size: 16px; }
                .container { font-family: Arial, sans-serif; padding: 20px; }
                .button {
                    background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 style="background-color:rgb(154, 184, 182)">Welcome to ChatBot!</h1>
                <h2>Thank You for Registering</h2>
                <p>Hello ${receiver.split("@")[0]},</p>
                <p>Your registration at ChatBot was successful. We are excited to have you on board!</p>
                <p>Please click the button below to verify your email address:</p>
                <p><a href="http://localhost:3000/api/users/verify?token=${verificationToken}" class="button">Verify Email</a></p>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Best regards,<br>ChatBot Team</p>
            </div>
        </body>
        </html>
    `,
  };
  return mailOptions;
};
