This is a full-stack event reservation platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform allows users to browse and reserve events, with both frontend and backend components.

Backend:
Developed using Node.js and Express.js, with TypeScript for type safety.

JWT authentication is used for secure user login and Google OAuth for easy registration.

MongoDB is used for data storage, with models for events, users, and ticketing. A custom db_connect.ts file connects the database.

The backend includes RESTful API routes for event creation, reading, updating, and deletion (CRUD operations), as well as user authentication routes for login and registration.

Frontend:
Built with React.js, utilizing functional components, React Router for navigation, and Redux for global state management (user, events, and tickets).

SCSS is used for styling, also Bootstrap 5 for responsivnes

Features include filtering and sorting of events, a calendar filter for selecting events based on date and location, dynamic ticket booking, and user profile management.

The platform also includes an admin panel with role-based access to manage events, users, and bookings.
