🩺 DocTreat – Modern Healthcare Platform

DocTreat is a full-stack healthcare platform designed to simplify and streamline interactions between patients and doctors. It enables appointment booking, secure medical document management, health history tracking, and even AI-powered consultations — all in one modern and responsive web application.

🚀 Features
👨‍⚕️ Patients

Book doctor appointments by city or specialization

Upload and manage medical documents

Track complete medical history

Ask health-related queries to an AI assistant

View doctor profiles and provide feedback

👩‍⚕️ Doctors

Manage appointments and patient interactions

Access patient medical history & uploaded documents

Write and upload medical notes

Secure document storage via Cloudinary

🤖 AI Assistant

Get instant answers to common medical queries

(Optional) Powered by OpenAI API integration

🧾 Other Highlights

JWT-based authentication for doctors and patients

Realtime messaging and notifications with Socket.io

Email confirmations & appointment reminders via Nodemailer

Role-based access (Admin, Doctor, Patient)

Modern, responsive UI built with Tailwind CSS + React

| Area          | Tech Used                          |
| ------------- | ---------------------------------- |
| Frontend      | React, Redux Toolkit, Tailwind CSS |
| Backend       | Node.js, Express.js                |
| Database      | MongoDB                            |
| Auth          | JWT-based authentication           |
| Media Upload  | Cloudinary                         |
| Emailing      | Nodemailer                         |
| Realtime Chat | Socket.io                          |
| AI Chat       | OpenAI (Optional)                  |



server/
├── config/
│   ├── cloudinary.js
│   └── database.js
├── controllers/
│   ├── adminController.js
│   ├── aiController.js
│   ├── appointmentController.js
│   ├── authController.js
│   ├── doctorController.js
│   ├── doctorDocumentController.js
│   ├── medicalNoteController.js
│   └── paymentController.js
├── middleware/
│   ├── authMiddleware.js
│   └── multer.js
├── models/
│   ├── Admin.js
│   ├── appointmentModel.js
│   ├── Doctor.js
│   ├── DoctorDocument.js
│   ├── MedicalNote.js
│   ├── Message.js
│   ├── otpModel.js
│   └── userModel.js
├── routes/
│   ├── adminRoutes.js
│   ├── aiRoutes.js
│   ├── appointmentRoutes.js
│   ├── doctorRoutes.js
│   ├── doctorDocumentRoutes.js
│   ├── medicalNoteRoutes.js
│   ├── paymentRoutes.js
│   └── userRoute.js
├── utils/
│   ├── cloudinary.js
│   ├── sendAppointmentEmail.js
│   ├── sendConfirmationEmail.js
│   ├── sendThankYouEmail.js
│   └── socket.js
├── index.js
└── package.json


src/
├── api/
│   └── authApi.js
├── components/
│   ├── ChatBox.js
│   ├── DocumentUploadPanel.js
│   ├── Footer.js
│   ├── MedicalHistoryPanel.js
│   ├── Navbar.js
│   └── UploadPatientDetails.js
├── pages/
│   ├── AdminDashboard.js
│   ├── AskAI.js
│   ├── BookAppointmentPage.js
│   ├── ConnectDoctors.js
│   ├── DoctorDashboard.js
│   ├── DoctorProfile.js
│   ├── Home.js
│   ├── Login.js
│   ├── PatientDashboard.js
│   └── SignUp.js
├── redux/
│   ├── authSlice.js
│   └── store.js
├── App.js
├── index.css
└── index.js

⚙️ Environment Variables

Create a .env file in your backend (/server) with:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

🧪 How to Run
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm start

🌐 Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas

Storage: Cloudinary

🙌 Acknowledgements

OpenAI API – for AI medical assistant

MongoDB – scalable database

Cloudinary – secure media storage

Tailwind CSS – rapid UI styling

📧 Contact

👨‍💻 Created by Prakash — Full-stack developer passionate about healthcare tech.

LinkedIn: [Your LinkedIn Profile]

Contributions: Feel free to open a PR 🚀