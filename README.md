# Publishly

Publishly is a full-stack community publishing platform where users can write, publish, and discover posts.

Users can create posts, choose a category, make posts public or private, edit or delete their own posts, and view personal publishing statistics.

---

## Features

- User registration and login
- JWT-based authentication using HTTP-only cookies
- Create posts
- Edit your own posts
- Delete your own posts
- Public and private posts
- Public community feed
- Category-based post filtering
- Personal dashboard
- Personal publishing statistics
- Posts grouped by category
- Publishing activity by month
- Responsive design
- 404 page for invalid routes

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

---

## Project Structure

```text
Publishly/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── users.model.js
│   │   └── posts.model.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   └── report.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── post.routes.js
│   │   └── report.routes.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── Frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── LoginForm.jsx
        │   ├── RegisterForm.jsx
        │   ├── PostCard.jsx
        │   ├── PostForm.jsx
        │   └── ConfirmationBox.jsx
        │
        ├── pages/
        │   ├── Home.jsx
        │   ├── Feed.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── Stats.jsx
        │   └── NotFound.jsx
        │
        ├── context/
        │   └── AuthContext.jsx
        │
        ├── services/
        │   └── api.js
        │
        ├── routes/
        │   ├── AppRoutes.jsx
        │   └── ProtectedRoutes.jsx
        │
        ├── App.jsx
        ├── main.jsx
        └── index.css