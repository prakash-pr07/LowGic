import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendOtp, verifyOtp } from "../services/api";
import SectionWrapper from "../components/SectionWrapper";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password

  const handleSendOtp = async () => {
    try {
      const res = await sendOtp(email);
      if (res?.message.includes("OTP sent")) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      toast.error(err?.message || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      if (res?.message === "OTP verified") {
        toast.success("OTP verified");
        setStep(3);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error(err?.message || "Verification failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successful");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <SectionWrapper id="forgot-password-section">
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-500">
            Forgot Password
          </h2>

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full rounded-lg shadow-md text-black py-2 px-3"
              />
              <button
                onClick={handleSendOtp}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded-lg font-semibold"
              >
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-input w-full rounded-lg shadow-md text-black py-2 px-3"
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-green-600 hover:bg-green-700 text-white py-2 w-full rounded-lg font-semibold"
              >
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input w-full rounded-lg shadow-md text-black py-2 px-3"
              />
              <button
                onClick={handleResetPassword}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded-lg font-semibold"
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ForgotPasswordPage;
