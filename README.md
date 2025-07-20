# Cleaning Service Management System

This project is a full-stack web application for managing cleaning service bookings. It features separate portals for users and administrators.

---

## 🔧 Tech Stack

* **Frontend (User & Admin)**: React + Vite + Tailwind CSS
* **Backend**: Node.js + Express
* **Database**: MongoDB with Mongoose

---

## 🌐 Features

### User Side

* Login / Signup (non-admin)
* View available services
* Book a service
* View and cancel personal bookings

### Admin Side

* Admin login
* View all bookings
* Add, edit, delete services

---

## 📁 Project Structure

```
📦 root
├── client/            # User-side frontend
│   ├── pages/
│   ├── components/
│   └── App.jsx
├── admin/             # Admin panel frontend
│   ├── pages/
│   ├── components/
│   └── App.jsx
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   └── server.js
└── README.md
```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Manuja3344/Cleaning-Service-Management-System--CRUD-.git
cd cleaning-service-app
```

### 2. Backend Setup

```bash
cd backend
npm install

# Configure your .env
cp .env.example .env

# Run the server
npm run dev
```

### 3. User Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Admin Panel Setup

```bash
cd ../admin
npm install
npm run dev
```

---

## 🛡️ Admin Creation Script

To create an admin manually:

```bash
node scripts/createAdmin.js
```

Ensure your `.env` has the correct `MONGO_URI` and `JWT_SECRET`.

---

## 📌 Notes

* Admin token is stored as `admin_token`
* Normal user token is stored as `token`
* Route protection and role validation are implemented on both frontend and backend

---

## 📫 Submission

Please submit the GitHub repo URL to `careers@metazync.com` as instructed.

---

## 📃 License

This project is part of an internship task for MetaZync. All rights reserved.
