import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendPhoneOTP = async (phone, otp) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        variables_values: otp,
        route: "otp",
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ OTP sent via SMS:", response.data);
    return true;
  } catch (error) {
    console.error("❌ Error sending SMS OTP:", error.message);
    return false;
  }
};