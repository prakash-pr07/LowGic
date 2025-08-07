// import nodemailer from "nodemailer";

// export const sendEmailOTP = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // ✅ your Gmail
//         pass: process.env.EMAIL_PASS, // ✅ App Password
//       },
//     });

//     const mailOptions = {
//       from: `"LoGic Legal" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for LoGic Verification",
//       text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("OTP email sent:", info.response);
//     return true;
//   } 
//   catch (error) {
//     console.error("Error sending OTP email:", error.message);
//     return false;
//   }
// };


// utils/sendEmailOTP.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmailOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });

    const mailOptions = {
      from: `"LoGic Legal" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject: 'Your OTP for LoGic Verification',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent via Brevo:', info.response);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error.message);
    return false;
  }
};
