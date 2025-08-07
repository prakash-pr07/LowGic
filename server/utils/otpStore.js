const otpStore = new Map();

export const saveOTP = (contact, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(contact, { otp, expiresAt });
};

export const verifyOTP = (contact, enteredOtp) => {
  const record = otpStore.get(contact);
  if (!record) return false;

  const { otp, expiresAt } = record;
  if (Date.now() > expiresAt) {
    otpStore.delete(contact);
    return false;
  }

  if (otp === enteredOtp) {
    otpStore.delete(contact);
    return true;
  }

  return false;
};

export default otpStore;

