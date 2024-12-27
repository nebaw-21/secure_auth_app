// otpService.js
import nodemailer from 'nodemailer';

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export { generateOTP, sendEmail };