# Sketchy Authentication App

A unique, hand-drawn pencil sketch themed authentication application built with a modern MERN stack.

## Tech stack used

- **Frontend:** React 19, Vite, Tailwind CSS v4
- **Animations:** Framer Motion, canvas-confetti
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form, Zod
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Security:** JWT (JSON Web Tokens), bcryptjs

## Features implemented

- **Sketchy UI Theme:** Fully customized hand-drawn aesthetic using CSS border-radius manipulation, graphing paper backgrounds, and handwriting fonts (Architects Daughter & Patrick Hand).
- **User Authentication:** Complete JWT-based login and registration flows.
- **Secure Passwords:** Passwords are encrypted and hashed in MongoDB using `bcrypt`.
- **Form Validation:** Real-time client-side validation using Zod and React Hook Form (e.g., password matching, email formatting).
- **Micro-Interactions:** Buttons rotate and react organically, custom SVG sketchy doodles float in the background.
- **Success Animations:** 
  - **Login:** Triggers a beautiful confetti explosion upon successful sign-in.
  - **Signup:** Triggers floating, glowing pencil particles welcoming the user.
- **Welcome Dashboard:** A clean, minimal welcome screen with a secure logout flow.

## Setup steps

### 1. Prerequisites
- Ensure you have **Node.js** (v18+) installed.
- Ensure you have a **MongoDB** connection string (or a local MongoDB instance running).

### 2. Backend Setup
1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Ensure your `.env` file is present in the `server` directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new, separate terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 4. View the App
Open your browser and navigate to `http://localhost:5173` to see the application!
# Loginassignment
# Loginassignment
