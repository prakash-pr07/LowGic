⚖️ LoGic – Modern LegalTech Platform

LoGic is a full-stack legal platform that connects clients with lawyers in their city, provides AI-powered legal assistance, document interpretation, and secure case management. It simplifies how clients find legal help, interact with lawyers, and manage their legal documents.

🚀 Features
👨‍💼 For Clients

Search and connect with lawyers city-wise or by specialization

Secure signup & login with email authentication

Real-time chat with lawyers regarding cases

Upload legal documents (like FIRs, contracts) and store them safely (Cloudinary integration)

Document Interpreter: Upload FIR and get keyword analysis + validation checks

Case history tracking and profile management

👩‍⚖️ For Lawyers

Manage cases and client interactions

Access uploaded legal documents from clients

Upload and manage case notes & documents

Dashboard to view ongoing and closed cases

🤖 AI & Automation

AI Chatbot to answer judiciary/legal queries instantly

FIR Document Interpreter that analyzes uploaded FIRs and extracts important keywords

Real-time notifications and updates

🔐 Security & Communication

JWT-based authentication

Role-based access (Admin, Lawyer, Client)

Real-time chat powered by Socket.io

Email OTP verification for signup & password reset

🛠️ Tech Stack
Area	Tech Used
Frontend	React, Redux Toolkit, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB
Auth	JWT, OTP-based authentication
Media Upload	Cloudinary
Payment	Razorpay
Realtime Comm	Socket.io
AI Chat	OpenAI API (legal Q&A + FIR interpreter)
📁 Project Structure
🔙 Backend (server/)
server/
├── data/                  # Static data like NGOs list
├── middleware/            # Middlewares (auth, etc.)
│   └── authMiddleware.js
├── models/                # MongoDB models
│   ├── Blog.js
│   ├── Case.js
│   ├── ChatMessage.js
│   ├── Document.js
│   ├── Lawyer.js
│   ├── Ngo.js
│   └── User.js
├── routes/                # API routes
│   ├── adminRoutes.js
│   ├── aiChatRoutes.js
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   ├── caseRoutes.js
│   ├── chatbotRoutes.js
│   ├── chatRoutes.js
│   ├── documentRoutes.js
│   ├── lawyerRoutes.js
│   ├── ngoRoutes.js
│   ├── otpRoutes.js
│   ├── paymentRoutes.js
│   └── testRoutes.js
├── scripts/               # Utility scripts
│   ├── createAdmin.js
│   └── seedNgos.js
├── utils/                 # Helper services
│   ├── geoService.js
│   ├── otpService.js
│   ├── otpStore.js
│   ├── razorpay.js
│   ├── sendEmail.js
│   ├── sendEmailOTP.js
│   └── sendPhoneOTP.js
├── .env
├── server.js
└── package.json

🎨 Frontend (src/)
src/
├── assets/
├── components/             # Reusable UI components
│   ├── FeaturesSection.js
│   ├── Footer.js
│   ├── Navbar.js
│   ├── SectionWrapper.js
│   ├── TestimonialsSection.js
│   └── TopLawyersSection.js
├── pages/                  # Main application pages
│   ├── ChatbotPage.js
│   ├── DashboardPage.js
│   ├── FindLawyersPage.js
│   ├── ForgotPasswordPage.js
│   ├── LoginPage.js
│   ├── PublicHomePage.js
│   └── SignupPage.js
├── redux/                  # State management
│   ├── authSlice.js
│   └── store.js
├── services/
│   └── api.js              # Axios/Fetch API service
├── utils/
│   └── api.js
├── index.css
└── index.js

⚡ How to Run
Backend
cd server
npm install
npm run dev


Set up .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
OPENAI_API_KEY=your_openai_key

Frontend
cd src
npm install
npm start

🌐 Deployment Suggestions

Frontend: Vercel, Netlify

Backend: Render, Railway, Heroku

Database: MongoDB Atlas

Storage: Cloudinary

🙌 Acknowledgements

OpenAI API for AI legal chatbot & FIR interpreter

MongoDB Atlas for scalable storage

Razorpay for payments

Cloudinary for legal document storage

Tailwind CSS for modern UI

📧 Contact

Created by Prakash — Full-stack developer passionate about legal tech.
Connect on [LinkedIn] or contribute via pull requests.