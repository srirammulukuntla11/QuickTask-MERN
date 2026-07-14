# 🚀 QuickTask - MERN Task Management System

A modern **Task Management Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. QuickTask allows users to securely manage their daily tasks with authentication, role-based access control, and an admin dashboard.

---

## 🌐 Live Demo

### Frontend (Vercel)
https://quick-task-mern.vercel.app/

### Backend (Render)
https://quicktask-mern.onrender.com/

---

# 📸 Screenshots

> Add screenshots of your application here.

- Login Page
- Register Page
- Dashboard
- Profile Page
- Admin Dashboard
- Admin Users
- Admin Tasks

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Role-based Authorization

---

## User Features

- Dashboard
- Create Task
- Edit Task
- Delete Task
- Update Task Status
- Search Tasks
- Filter Tasks
- Dashboard Statistics
- Profile Page

---

## Admin Features

- Admin Dashboard
- View System Statistics
- View All Users
- Delete Users
- View All Tasks
- Delete Tasks

---

## Dashboard Features

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Express Validator
- Helmet
- CORS
- Morgan
- Cookie Parser
- Compression

---

## Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# 📂 Project Structure

```
QuickTask-MERN
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <YOUR_GITHUB_REPO_URL>

cd QuickTask-MERN
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

---

# 🗄 Database

Database Used:

- MongoDB Atlas

Collections

- Users
- Tasks

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
JWT Token Generated
      │
      ▼
Token Stored
      │
      ▼
Protected API Requests
      │
      ▼
Backend Verification
      │
      ▼
Authorized Access
```

---

# 📊 API Endpoints

## Authentication

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |
| GET | /api/v1/auth/me |

---

## Tasks

| Method | Endpoint |
|----------|-------------------------|
| GET | /api/v1/tasks |
| POST | /api/v1/tasks |
| PUT | /api/v1/tasks/:id |
| PATCH | /api/v1/tasks/:id/status |
| DELETE | /api/v1/tasks/:id |

---

## Admin

| Method | Endpoint |
|----------|---------------------------|
| GET | /api/v1/admin/stats |
| GET | /api/v1/admin/users |
| DELETE | /api/v1/admin/users/:id |
| GET | /api/v1/admin/tasks |
| DELETE | /api/v1/admin/tasks/:id |

---

# 🚀 Deployment

## Frontend

Hosted on

- Vercel

## Backend

Hosted on

- Render

## Database

Hosted on

- MongoDB Atlas

---

# Git Workflow

```
main
│
├── v1.0
│
└── ui-redesign
      │
      ├── Dashboard UI
      ├── Profile UI
      ├── Admin Module
      └── Final Merge
```

---

# Future Improvements

- Email Verification
- Forgot Password Email
- File Uploads
- Notifications
- Dark Mode
- Charts & Analytics
- Activity Logs
- Mobile App
- Team Collaboration
- Calendar Integration

---

# 👨‍💻 Author

**Sriram Mulukuntla**

GitHub:
https://github.com/srirammulukuntla11

LinkedIn:
(Add your LinkedIn URL)

---

# ⭐ Support

If you found this project helpful,

⭐ Star this repository on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

# 🎯 Project Status

✅ Completed

Version:

**v2.0**

Production Ready ✔️