// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// function Navbar({ user, logout }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isLoggedIn = !!user;

//   const isSignupPage = location.pathname === "/signup";
//   const isLoginPage = location.pathname === "/login";

//   const handleProtectedClick = (route) => {
//     if (route === "/interpreter") {
//       toast.info("In Progress – Available Soon");
//       return;
//     }

//     if (!isLoggedIn && route !== "/" && route !== "/login" && route !== "/signup") {
//       toast.warning("Please login first to access this feature");
//       return;
//     }

//     navigate(route);
//   };

//   return (
//     <nav className="bg-gray-900 text-white border-b border-gray-800 shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
//         {/* Left: Logo */}
//         <div className="w-1/4">
//           <Link to="/" className="text-3xl font-extrabold tracking-wide">
//             <span className="text-white">Lo</span>
//             <span className="text-blue-500">Gic</span>
//           </Link>
//         </div>

//         {/* Center: Navigation */}
//         <div className="w-2/4 flex justify-center gap-6 text-base font-semibold">
//           <button
//             onClick={() => {
//               handleProtectedClick("/");
//               window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//             className="hover:text-blue-500 hover:scale-105 transition-all duration-200"
//           >
//             Home
//           </button>
//           {[
//             { name: "Find Lawyers", path: "/lawyers" },
//             { name: "Case Tracker", path: "/case-tracker" },
//             { name: "Document Interpreter", path: "/interpreter" },
//             { name: "Chatbot", path: "/chatbot" },
//             { name: "Dashboard", path: "/dashboard" },
//           ].map((item) => (
//             <button
//               key={item.path}
//               onClick={() => handleProtectedClick(item.path)}
//               className="hover:text-blue-500 hover:scale-105 transition-all duration-200"
//             >
//               {item.name}
//             </button>
//           ))}
//         </div>

//         {/* Right: Auth Buttons */}
//         <div className="w-1/4 flex justify-end gap-4">
//           {!isLoggedIn ? (
//             <>
//               {/* Show SignUp only if not on signup page */}
//               {!isSignupPage ? (
//                 <Link
//                   to="/signup"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full transition font-bold shadow-md"
//                 >
//                   Sign Up
//                 </Link>
//               ) : (
//                 <div className="w-[128px]"></div> // empty space for alignment
//               )}
//               {/* Show Login only if not on login page */}
//               {!isLoginPage ? (
//                 <Link
//                   to="/login"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full transition font-bold shadow-md"
//                 >
//                   Login
//                 </Link>
//               ) : (
//                 <div className="w-[128px]"></div> // empty space for alignment
//               )}
//             </>
//           ) : (
//             <button
//               onClick={logout}
//               className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full transition font-bold shadow-md"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



// Replace It With Upper Code Later

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignupPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";

  const handleNavigate = (route) => {
    if (route === "/interpreter") {
      alert("This feature is coming soon.");
      return;
    }
    navigate(route);
  };

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800 shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="w-1/4">
          <Link to="/" className="text-3xl font-extrabold tracking-wide">
            <span className="text-white">Lo</span>
            <span className="text-blue-500">Gic</span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="w-3/5 flex justify-center flex-wrap gap-6 text-base font-semibold">
          <button onClick={() => handleNavigate("/")} className="hover:text-blue-500 hover:scale-105 transition-all duration-200">
            Home
          </button>
          <button onClick={() => handleNavigate("/lawyers")} className="hover:text-blue-500 hover:scale-105 transition-all duration-200">
            Find Lawyers
          </button>
          <button onClick={() => handleNavigate("/case-tracker")} className="hover:text-blue-500 hover:scale-105 transition-all duration-200">
            Case Tracker
          </button>
          <button onClick={() => handleNavigate("/interpreter")} className="hover:text-blue-500 hover:scale-105 transition-all duration-200">
            Document Interpreter
          </button>
          <button onClick={() => handleNavigate("/chatbot")} className="hover:text-blue-500 hover:scale-105 transition-all duration-200">
            Chatbot
          </button>
          <button onClick={() => handleNavigate("/dashboard")} className="hover:text-blue-500 hover:scale-105 transition-all duration-200">
            Dashboard
          </button>
        </div>

        {/* Right: Auth Buttons */}
        <div className="w-1/4 flex justify-end gap-4">
          {!user ? (
            <>
              {!isSignupPage ? (
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full transition font-bold shadow-md">
                  Sign Up
                </Link>
              ) : (
                <div className="w-[128px]"></div>
              )}
              {!isLoginPage ? (
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full transition font-bold shadow-md">
                  Login
                </Link>
              ) : (
                <div className="w-[128px]"></div>
              )}
            </>
          ) : (
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full transition font-bold shadow-md">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
