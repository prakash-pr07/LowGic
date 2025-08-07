// utils/otpService.js

import { sendEmailOTP } from './sendEmailOTP.js';
import { sendPhoneOTP } from './sendPhoneOTP.js';
import { saveOTP, verifyOTP } from './otpStore.js';

// Combined OTP sender
const sendOTP = async (contact) => {
  var otp = otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
  });
  console.log("OTP Generated" , otp);
  // console.log("Sending OTP to:", contact);
  // console.log("OTP generated:", otp);

  if (contact.includes("@")) {
    const sent = await sendEmailOTP(contact, otp);
    if (!sent) throw new Error("Failed to send email OTP");
  } else {
    const sent = await sendPhoneOTP(contact, otp);
    if (!sent) throw new Error("Failed to send SMS OTP");
  }

  saveOTP(contact, otp);
  return otp;
};

export { sendOTP, verifyOTP };


