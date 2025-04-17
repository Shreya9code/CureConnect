import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,     // Add this in .env
      pass: process.env.EMAIL_PASS // App password for Gmail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email. This link is valid for 1 hour.</p>`
  };

  await transporter.sendMail(mailOptions);
};
