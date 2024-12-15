const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmailOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your OTP is: ${otp}. Valid for 10 minutes.`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 10 minutes.</p>`,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendMobileOTP = async (mobile, otp) => {
  // Mock SMS service - In production, use a real SMS service like Twilio
  console.log(`Sending OTP ${otp} to ${mobile}`);
  return true;
};

module.exports = {
  generateOTP,
  sendEmailOTP,
  sendMobileOTP,
};