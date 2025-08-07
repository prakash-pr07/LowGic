import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// ✅ OTP Sender (Universal)
export const sendOtp = async (contact) => {
  try {
    const res = await API.post("/auth/send-otp", { contact });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP send failed" };
  }
};

// ✅ OTP Verifier
export const verifyOtp = async (contact, enteredOtp) => {
  try {
    const res = await API.post("/auth/verify-otp", { contact, enteredOtp });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

// Login Logic
export const loginUser = async (credentials) => {
  const res = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

// Finding Lowyer logic
export const fetchLawyersByCity = async (city) => {
  const res = await axios.get(`http://localhost:8000/api/lawyers/search?city=${city}`);
  return res.data.lawyers;
};