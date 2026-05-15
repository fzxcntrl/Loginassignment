# TaskFlow - MERN Task Management App

A modern, multi-user task management application built with the PERN stack (PostgreSQL, Express, React, Node.js).

## Tech stack used

- **Frontend:** React 19, Vite, Tailwind CSS v4
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Sequelize ORM
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Features implemented

- **Multi-User Authentication:** Secure Signup/Login with password hashing and JWT.
- **Task Management (CRUD):** 
  - Create tasks with titles and descriptions.
  - View personal tasks (users only see their own tasks).
  - Update task status (Pending ↔ Completed).
  - Delete tasks.
- **Clean Modern UI:** Usable, responsive design built with Tailwind CSS.
- **Protected Routes:** Only authenticated users can access their personal dashboard.
- **Error Handling:** Centralized error handling middleware on the backend.
- **Input Validation:** Backend validation using `express-validator` and `zod` on the frontend.

## Setup steps

### 1. Prerequisites
- Ensure you have **Node.js** installed.
- Ensure you have a **PostgreSQL** database instance (local or hosted like Supabase/Neon).

### 2. Backend Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables in `.env`:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   PORT=5001
   JWT_SECRET=your_secure_jwt_secret
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

### 4. View the App
Open your browser and navigate to `http://localhost:5173`.
