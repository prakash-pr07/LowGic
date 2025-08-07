// export default SignupPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { sendOtp, verifyOtp } from "../services/api";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
    role: "",
    emailOtp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      password,
      confirmPassword,
      role,
    } = formData;

    if (!firstName) return toast.error("Please fill your First Name");
    if (!lastName) return toast.error("Please fill your Last Name");
    if (!email) return toast.error("Please fill your Email");
    if (!email.endsWith("@gmail.com"))
      return toast.error("Please enter a valid email");
    if (!phone) return toast.error("Please fill your Phone");
    if (!city) return toast.error("Please fill your City");
    if (!state) return toast.error("Please fill your State");
    if (!password) return toast.error("Please fill your Password");
    if (!confirmPassword)
      return toast.error("Please fill your Confirm Password");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (!role) return toast.error("Please select your Role");

    return true;
  };

  const handleSignup = async () => {
    const isValid = validateFields();
    if (!isValid) return;

    try {
      const res = await sendOtp(formData.email);
      if (res?.message === "OTP sent successfully") {
        toast.success("OTP sent to your email");
        setEmailOtpSent(true);
        setOtpTimer(30);
        const interval = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

  const handleVerifyAndRegister = async () => {
    try {
      const res = await verifyOtp(formData.email, formData.emailOtp);
      if (res?.message === "OTP verified") {
        toast.success("Email verified successfully! Registration complete.");
        setEmailOtpVerified(true);
        // Here you can add actual signup API call
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      <div className="md:w-1/2 w-full px-6 py-10 overflow-y-auto z-10">
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Create Your Account
          </h2>

          <div className="space-y-4 text-black">
            {[
              { name: "firstName", placeholder: "Enter First Name", label: "First Name" },
              { name: "lastName", placeholder: "Enter Last Name", label: "Last Name" },
              { name: "email", placeholder: "Enter Email", label: "Email" },
              { name: "phone", placeholder: "Enter Phone", label: "Phone" },
              { name: "city", placeholder: "Enter City", label: "City" },
              { name: "state", placeholder: "Enter State", label: "State" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-white font-bold mb-1">{field.label}</label>
                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="form-input w-full h-12 rounded-lg shadow-md"
                />
              </div>
            ))}

            <div className="relative">
              <label className="block text-white font-bold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="form-input w-full h-12 pr-10 rounded-lg shadow-md"
              />
              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="relative">
              <label className="block text-white font-bold mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
                className="form-input w-full h-12 pr-10 rounded-lg shadow-md"
              />
              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input w-full h-12 rounded-lg shadow-md"
              >
                <option value="">Select Role</option>
                <option value="Client">Client</option>
                <option value="Lawyer">Lawyer</option>
              </select>
            </div>

            {!emailOtpSent ? (
              <button
                type="button"
                onClick={handleSignup}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition shadow-md"
              >
                Sign Up
              </button>
            ) : (
              <>
                <label className="block text-white font-bold mt-3 mb-1">Enter OTP</label>
                <input
                  type="text"
                  name="emailOtp"
                  value={formData.emailOtp}
                  onChange={handleChange}
                  placeholder="Enter OTP sent to your email"
                  className="form-input w-full h-12 rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={handleVerifyAndRegister}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition shadow-md mt-2"
                >
                  Verify & Register
                </button>
              </>
            )}

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full h-screen hidden md:flex items-center justify-center p-6 fixed right-0 top-0 z-0">
        <img
          src="/assets/supreme-court.png"
          alt="Supreme Court"
          className="h-[90%] w-auto object-contain rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default SignupPage;

