import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send an email using async/await
export const sendMail = async (userEmail: string, otp: string) => {
  const info = await transporter.sendMail({
    from: `Vibely support ${process.env.EMAIL_USER}`,
    to: userEmail,
    subject: "OTP Verification",
    text: "Hello world?", // Plain-text version of the message
    html: `<p>This is your otp ${otp} for verification</p>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};