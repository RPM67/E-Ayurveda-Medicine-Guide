# 🌿 E-Ayurveda Medicine Guide

A comprehensive full-stack web application for managing and discovering Ayurvedic medicines and treatments. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## ✨ Features

### 👥 Public
- Browse Ayurvedic medicines by disease
- View detailed information:
  - Benefits
  - Dosage
  - Side effects
  - Purchase links
- User registration & login
- Submit feedback and ratings
- Mobile responsive UI

### 🔐 Admin
- Secure admin dashboard
- **Disease Management**:
  - Add, edit, delete diseases
  - View all listed diseases
- **Medicine Management**:
  - Add medicines with images
  - Edit/delete medicines
  - Link medicines to diseases
- Track admin who added/modified entries

---

## ⚙️ Tech Stack

### Frontend
- React (with Vite)
- React Router
- Axios
- React Select
- Custom CSS (responsive)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Express Session for login sessions
- Multer for image uploads
- Bcrypt for password hashing

---

## 🚀 Setup Instructions

### 🔧 Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies(run below command in terminal)
npm install

# Create .env file(run below commands in terminal)
touch .env
echo "PORT=5000" >> .env
echo "MONGO_URI=mongodb://127.0.0.1:27017/eAyurveda" >> .env
echo "SESSION_SECRET=GROUP_3" >> .env
echo "UPLOADS_DIR=uploads" >> .env

# Start backend server
npm start
```

### 🔧 Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend (React) dev server
npm run dev
```

🗂️ Project Structure
```bash
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── uploads/
    └── app.js
```

### 🔐 Authentication Flow

#### 👤 User
- Register with username, email, password

- Login to view medicine details

- Submit feedback on medicines


#### 🛡️ Admin
- Login to access dashboard

- Manage diseases & medicines

- Track which admin added/edited content



### 🌐 API Routes

#### Public Routes

- GET /api/diseases — List all diseases

- GET /api/medicines — List all medicines

- GET /api/feedback/medicine/:name — Get feedback for a specific medicine

#### Admin (Protected) Routes
- POST /api/diseases/add — Add new disease

- PUT /api/diseases/:name — Update disease

- DELETE /api/diseases/:name — Delete disease

- POST /api/medicines/add — Add new medicine

- PUT /api/medicines/:name — Update medicine

- DELETE /api/medicines/:name — Delete medicine

  
