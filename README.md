A full-stack web application for event management and reservations for the event, built with TypeScript, React, Vite, and Node.js. 

It allows users to register, log in (manually or via Google), browse events, and reserve tickets.

---

## 🚀 Features

### 🧑‍💼 User Features
- User registration and login
- Google OAuth authentication
- Browse and filter events
- Reserve tickets with quantity selector
- Favorite events
- Responsive UI with modern design

### 🛠️ Admin Features
- Create, edit, and delete events
- Dashboard to manage events

---

## 🧱 Tech Stack

| Layer      | Tech                         |
|------------|------------------------------|
| Frontend   | React, TypeScript, Vite      |
| Backend    | Node.js, Express, TypeScript |
| Styling    | SCSS Modules                 |
| Auth       | JWT, Google OAuth            |
| Database   | MongoDB                      |
| State Mgmt | Redux Toolkit                |


fikesoft-reservations/
├── README.md               # Project documentation
├── backend/                # Backend server using Node.js + Express
│   ├── package.json        # Backend dependencies and scripts
│   ├── tsconfig.json       # TypeScript configuration
│   └── src/
│       ├── server.ts       # Entry point for the backend server
│       ├── config/         # DB configuration
│       │   └── db_connect.ts
│       ├── controllers/    # Logic for handling routes
│       ├── middleware/     # Custom Express middleware (e.g., password hashing, request validation)
│       ├── models/         # Mongoose schemas for MongoDB
│       ├── routes/         # All backend routes (event & auth)
│       └── validator/      # Zod or Joi validation schemas
│
├── frontend/               # Frontend client using React + Vite
│   ├── index.html          # Entry HTML file
│   ├── vite.config.ts      # Vite configuration
│   └── src/
│       ├── App.tsx         # Main App component
│       ├── main.tsx        # Entry point for React app
│       ├── api/            # Axios API configuration for events/auth
│       ├── assets/         # Static assets (images, SCSS)
│       ├── components/     # Reusable UI components (buttons, headers, forms)
│       ├── features/       # Feature-specific pages (Home, Auth, Events)
│       ├── layouts/        # Application layout components
│       ├── routes/         # Custom route wrappers (e.g., ProtectedRoute)
│       └── store/          # Redux store, slices, and custom hooks
