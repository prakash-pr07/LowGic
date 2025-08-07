import Case from "../models/Case.js";
import User from "../models/User.js";
import {sendOTP} from "../utils/otpService.js";

// Client creates a case
export const createCase = async (req, res) => {
  const { title, description } = req.body;
  const clientId = req.user.id;

  try {
    const newCase = await Case.create({
      client: clientId,
      title,
      description
    });

    res.status(201).json({ success: true, case: newCase });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create case" });
  }
};

// Lawyer accepts the case
export const acceptCase = async (req, res) => {
  const { caseId } = req.params;
  const lawyerId = req.user.id;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) return res.status(404).json({ message: "Case not found" });

    caseData.lawyer = lawyerId;
    caseData.status = "accepted";
    await caseData.save();

    res.status(200).json({ success: true, case: caseData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error accepting case" });
  }
};

// Update status (e.g. in-progress, resolved)
export const updateCaseStatus = async (req, res) => {
  const { caseId } = req.params;
  const { status } = req.body;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) return res.status(404).json({ message: "Case not found" });

    caseData.status = status;
    await caseData.save();

    res.status(200).json({ success: true, case: caseData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Status update failed" });
  }
};

// Send OTP before closure
export const sendClosureOtp = async (req, res) => {
  const { caseId } = req.params;

  try {
    const caseData = await Case.findById(caseId).populate("client");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000;

    caseData.closureOtp = otp;
    caseData.closureOtpExpiry = expiry;
    await caseData.save();

    await sendOTP(caseData.client.phone, otp);
    res.status(200).json({ success: true, message: "OTP sent for closure" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// Confirm case closure with OTP
export const confirmClosure = async (req, res) => {
  const { caseId } = req.params;
  const { otp } = req.body;

  try {
    const caseData = await Case.findById(caseId);
    if (!caseData) return res.status(404).json({ message: "Case not found" });

    if (caseData.closureOtp !== otp || caseData.closureOtpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    caseData.status = "resolved";
    caseData.closureOtp = null;
    caseData.closureOtpExpiry = null;
    await caseData.save();

    res.status(200).json({ success: true, message: "Case closed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Closure failed" });
  }
};
