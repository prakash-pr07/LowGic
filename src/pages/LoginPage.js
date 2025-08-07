// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { loginUser } from "../services/api";
// import SectionWrapper from "../components/SectionWrapper";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({
//     emailOrPhone: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!credentials.emailOrPhone || !credentials.password) {
//       return toast.error("All fields are required");
//     }

//     try {
//       const res = await loginUser(credentials);
//       if (res?.token) {
//         toast.success("Login successful");
//         localStorage.setItem("token", res.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex md:flex-row flex-col bg-gray-900 text-white overflow-hidden relative">
//       {/* Fixed Supreme Court Image on Right */}
//       <div className="md:w-1/2 w-full h-full hidden md:flex items-center justify-center p-6 fixed right-0 top-0 z-0">
//         <img
//           src="/assets/supreme-court.png"
//           alt="Supreme Court"
//           className="h-[85%] w-auto object-contain rounded-xl shadow-xl"
//         />
//       </div>

//       {/* Scrollable Login Form Section (Left) */}
//       <div className="md:w-1/2 w-full h-full overflow-y-auto z-10 relative px-6 py-16 flex items-center justify-center">
//         <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl">
//           <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
//             Welcome Back!
//           </h2>

//           <form onSubmit={handleLogin} className="space-y-6 text-black">
//             <div>
//               <label className="block text-white font-bold mb-1">Email or Phone</label>
//               <input
//                 type="text"
//                 name="emailOrPhone"
//                 value={credentials.emailOrPhone}
//                 onChange={handleChange}
//                 placeholder="Enter email or phone"
//                 className="form-input w-full rounded-lg shadow-md h-12"
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-white font-bold mb-1">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={credentials.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="form-input w-full pr-10 rounded-lg shadow-md h-12"
//               />
//               <div
//                 className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
//             >
//               Login
//             </button>

//             <div className="flex justify-between text-sm text-gray-400 mt-2">
//               <Link to="/forgot-password" className="hover:text-blue-400">
//                 Forgot Password?
//               </Link>
//               <span className="text-gray-500">Don’t have an account?</span>
//             </div>

//             <Link
//               to="/signup"
//               className="w-full block mt-3 text-center bg-white text-blue-600 border border-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
//             >
//               Sign Up
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser } from "../services/api";
import SectionWrapper from "../components/SectionWrapper";

const LoginPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailOrPhone, password } = credentials;
    if (!emailOrPhone || !password) {
      return toast.error("All fields are required");
    }

    // Prepare payload: check if it's email or phone
    const isEmail = emailOrPhone.includes("@");
    const payload = {
      password,
      ...(isEmail ? { email: emailOrPhone } : { phone: emailOrPhone }),
    };

    try {
      const res = await loginUser(payload);
      if (res?.token) {
        toast.success("Login successful");
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col bg-gray-900 text-white overflow-hidden relative">
      {/* Fixed Supreme Court Image on Right */}
      <div className="md:w-1/2 w-full h-full hidden md:flex items-center justify-center p-6 fixed right-0 top-0 z-0">
        <img
          src="/assets/supreme-court.png"
          alt="Supreme Court"
          className="h-[85%] w-auto object-contain rounded-xl shadow-xl"
        />
      </div>

      {/* Scrollable Login Form Section (Left) */}
      <div className="md:w-1/2 w-full h-full overflow-y-auto z-10 relative px-6 py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Welcome Back!
          </h2>

          <form onSubmit={handleLogin} className="space-y-6 text-black">
            <div>
              <label className="block text-white font-bold mb-1">Email or Phone</label>
              <input
                type="text"
                name="emailOrPhone"
                value={credentials.emailOrPhone}
                onChange={handleChange}
                placeholder="Enter email or phone"
                className="form-input w-full rounded-lg shadow-md h-12"
              />
            </div>

            <div className="relative">
              <label className="block text-white font-bold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input w-full pr-10 rounded-lg shadow-md h-12"
              />
              <div
                className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
            >
              Login
            </button>

            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <Link to="/forgot-password" className="hover:text-blue-400">
                Forgot Password?
              </Link>
              <span className="text-gray-500">Don’t have an account?</span>
            </div>

            <Link
              to="/signup"
              className="w-full block mt-3 text-center bg-white text-blue-600 border border-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
            >
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
