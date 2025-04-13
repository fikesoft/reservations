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
    ├── README.md
    ├── backend/
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── .gitignore
    │   └── src/
    │       ├── server.ts
    │       ├── config/
    │       │   └── db_connect.ts
    │       ├── controllers/
    │       │   ├── authController.ts
    │       │   └── eventController.ts
    │       ├── middleware/
    │       │   ├── hashPasword.ts
    │       │   └── validateRequest.ts
    │       ├── models/
    │       │   ├── event.ts
    │       │   └── users.ts
    │       ├── routes/
    │       │   ├── createEvent.ts
    │       │   ├── deleteEvent.ts
    │       │   ├── editEvent.ts
    │       │   ├── googleAuth.ts
    │       │   ├── googleAuthCallback.ts
    │       │   ├── index.ts
    │       │   ├── loginUser.ts
    │       │   ├── readEvent.ts
    │       │   └── registerUser.ts
    │       └── validator/
    │           ├── eventIdSchema.ts
    │           ├── eventSchema.ts
    │           └── index.ts
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        ├── vite.config.ts
        ├── .gitignore
        ├── public/
        └── src/
            ├── App.tsx
            ├── main.tsx
            ├── vite-env.d.ts
            ├── api/
            │   ├── authApi.ts
            │   ├── baseUrl.ts
            │   └── eventApi.ts
            ├── assets/
            │   ├── img/
            │   └── style/
            │       ├── _mixins.scss
            │       ├── _variables.scss
            │       └── reset.scss
            ├── components/
            │   ├── index.ts
            │   ├── ApplyFilters/
            │   │   ├── applyFilterInput.module.scss
            │   │   └── ApplyFilterInput.tsx
            │   ├── AuthGoogleBtn/
            │   │   ├── authBtnGoogle.module.scss
            │   │   └── AuthGoogleBtn.tsx
            │   ├── AuthManualBtn/
            │   │   ├── authManualBtn.module.scss
            │   │   └── AuthManualBtn.tsx
            │   ├── CalendarFilter/
            │   │   ├── calendar.module.scss
            │   │   └── Calendar.tsx
            │   ├── Create Event Form/
            │   │   ├── createForm.module.scss
            │   │   └── CreateForm.tsx
            │   ├── Edit Event Form/
            │   │   ├── editForm.module.scss
            │   │   └── EditForm.tsx
            │   ├── Event/
            │   │   ├── event.module.scss
            │   │   └── Event.tsx
            │   ├── Favorite/
            │   │   ├── favorite.module.scss
            │   │   └── Favorite.tsx
            │   ├── Filter/
            │   │   ├── filter.module.scss
            │   │   └── Filter.tsx
            │   ├── Footer/
            │   │   ├── Footer.module.scss
            │   │   └── Footer.tsx
            │   ├── Header/
            │   │   ├── header.module.scss
            │   │   └── Header.tsx
            │   ├── IncreaseTicketNumber/
            │   │   └── IncreaseNumber.tsx
            │   ├── InputRow/
            │   │   ├── inputRow.module.scss
            │   │   └── InputRow.tsx
            │   └── Logo/
            │       └── Logo.tsx
            ├── features/
            │   ├── index.ts
            │   ├── AboutUs/
            │   │   ├── AboutUsPage.module.scss
            │   │   └── AboutUsPage.tsx
            │   ├── auth/
            │   │   ├── login.module.scss
            │   │   ├── Login.tsx
            │   │   ├── register.module.scss
            │   │   └── Register.tsx
            │   ├── Callback/
            │   │   └── Callback.tsx
            │   ├── Cart/
            │   │   └── Cart.tsx
            │   ├── Error/
            │   │   └── Error404.tsx
            │   ├── Event Page/
            │   │   ├── eventPage.module.scss
            │   │   └── EventPage.tsx
            │   ├── Events/
            │   │   ├── events.module.scss
            │   │   └── Events.tsx
            │   └── Home/
            │       ├── Home.tsx
            │       └── sections/
            │           ├── aboutUs/
            │           │   ├── aboutUs.module.scss
            │           │   └── AboutUs.tsx
            │           ├── landing/
            │           │   ├── landing.module.scss
            │           │   └── Landing.tsx
            │           └── randomSelection/
            │               ├── randomSelection.module.scss
            │               └── RandomSelection.tsx
            ├── layouts/
            │   ├── main-layout.module.scss
            │   └── MainLayout.tsx
            ├── routes/
            │   └── ProtectedRoute.tsx
            └── store/
                ├── store.ts
                ├── hooks/
                │   ├── useDispach.ts
                │   └── useSelector.ts
                └── slices/
                    ├── editSlice.ts
                    ├── eventSlice.ts
                    ├── filterSlice.ts
                    ├── ticketSlice.ts
                    ├── toastSlice.ts
                    └── userSlice.ts
