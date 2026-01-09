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
export const sendOtp = async (userEmail: string, otp: string) => {
  const info = await transporter.sendMail({
    from: `Vibely support ${process.env.EMAIL_USER}`,
    to: userEmail,
    subject: "OTP Verification",
    text: "Hello world?", // Plain-text version of the message
    html: `<p>This is your otp ${otp} for verification</p>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};

export const sendResetPassLink = async (userEmail: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const info = await transporter.sendMail({
    from: `"Vibely Support" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Reset Your Vibely Password",
    text: `Reset your password by clicking this link: ${resetUrl}`, // Fallback for plain-text clients
    html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 10px; padding: 20px;">
      <h2 style="color: #333; text-align: center;">Vibely</h2>
      <p>Hi there,</p>
      <p>We received a request to reset your password for your Vibely account. Click the button below to set a new one:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
           Reset Password
        </a>
      </div>

      <p style="font-size: 0.9em; color: #666;">
        This link will expire in <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email or contact support if you have concerns.
      </p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      
      <p style="font-size: 0.8em; color: #999; text-align: center;">
        If the button above doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetUrl}" style="color: #6366f1;">${resetUrl}</a>
      </p>
    </div>
    `,
  });
};
