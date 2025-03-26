
# Backend for E Ayurveda Recommendation System

This backend is designed to support the E Ayurveda Recommendation System for Disease. It provides APIs for managing medicines, diseases, and admin authentication. The backend is built using Node.js, Express.js, and MongoDB.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [API Endpoints](#api-endpoints)
5. [Environment Variables](#environment-variables)

---

## Project Structure

```
backend/
├── app.js                  # Main entry point of the application
├── config/
│   └── db.js               # MongoDB connection configuration
├── controllers/            # Business logic for routes
│   ├── adminController.js
│   ├── diseaseController.js
│   └── medicineController.js
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/                 # Mongoose schemas
│   ├── admin.js
│   ├── disease.js
│   └── medicine.js
├── routes/                 # API route definitions
│   ├── adminRoutes.js
│   ├── diseaseRoutes.js
│   └── medicineRoutes.js
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
└── README.md               # Documentation (this file)
```

---

## Features

1. **Admin Authentication**:
   - Login and logout functionality for admins.
   - Session-based authentication using `express-session`.

2. **Disease Management**:
   - Add, retrieve, update, and delete diseases.
   - Store disease details like name, description, and symptoms.

3. **Medicine Management**:
   - Add, retrieve, update, and delete medicines.
   - Store medicine details like name, description, benefits, dosage, side effects, and purchase links.
   - Medicines are linked to diseases via `diseaseId`.

4. **Database**:
   - MongoDB is used as the database.
   - Mongoose is used for schema modeling and database interaction.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGO_URI=mongodb://127.0.0.1:27017/eAyurveda
     SESSION_SECRET='YOUR_SECRET_KEY'
     UPLOADS_DIR=uploads
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on the port specified in the `.env` file (default: 3000).

---

## API Endpoints

### Admin Routes (`/api/admin`)
- **POST /login**: Admin login.
- **GET /logout**: Admin logout.

### Disease Routes (`/api/diseases`)
- **POST /add**: Add a new disease (requires authentication).
- **GET /**: Retrieve all diseases.
- **GET /:name**: Retrieve a disease by name.
- **PUT /:name**: Update a disease by name (requires authentication).
- **DELETE /:name**: Delete a disease by name (requires authentication).

### Medicine Routes (`/api/medicines`)
- **POST /add**: Add a new medicine (requires authentication).
- **GET /**: Retrieve all medicines.
- **GET /:name**: Retrieve a medicine by name.
- **PUT /:name**: Update a medicine by name (requires authentication).
- **DELETE /:name**: Delete a medicine by name (requires authentication).

---

## Environment Variables

| Variable       | Description                              | Default Value                  |
|----------------|------------------------------------------|--------------------------------|
| `PORT`         | Port number for the server              | `3000`                         |
| `MONGO_URI`    | MongoDB connection string               | `mongodb://127.0.0.1:27017/eAyurveda` |
| `SESSION_SECRET` | Secret key for session management      | `'YOUR_SECRET_KEY'`           |
| `UPLOADS_DIR`  | Directory for static file uploads       | `uploads`                     |

---

## Notes

- **Authentication**: Admin routes and certain operations on diseases and medicines require authentication using the `auth` middleware.
- **Database Models**:
  - `Admin`: Stores admin credentials.
  - `Disease`: Stores disease details.
  - `Medicine`: Stores medicine details and links them to diseases.
- **Error Handling**: Proper error handling is implemented for all routes.

Feel free to extend or modify this backend as per your requirements.
