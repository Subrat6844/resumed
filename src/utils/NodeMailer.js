import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config({
  path:"../../.env"
});
// Create a transporter using Gmail's SMTP server details
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Utility function to send reset password email
export default async function sendResetPasswordEmail(tokenUrl, recipientEmail) {
  try {
    const mailOptions = {
      from: process.env.EMAIL,// Sender's email address
      to: recipientEmail, // Recipient's email address
      subject: "Reset Your Password",
      text: `Click the link below to reset your password:\n${tokenUrl}`,
     
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info; // Return email information
  } catch (error) {
    console.error("Error sending email:", error);
    return error; // Return error information
  }
}
