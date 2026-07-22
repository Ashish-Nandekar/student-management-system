# Student Management System

A full-stack CRUD application for managing student records, built with React on the frontend and FastAPI + PostgreSQL on the backend.

---

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React 19, Vite, Axios             |
| Backend  | FastAPI, Python, Pydantic         |
| Database | PostgreSQL (Neon DB recommended)  |

---

## Features

- View all student records in a table
- Add a new student (ID, Name, Course)
- Edit an existing student record
- Delete a student record
- RESTful API with full CRUD support (GET, POST, PUT, PATCH, DELETE)

---

## Project Structure

```
Student Management System/
├── Backend/
│   ├── main.py            # FastAPI application & API routes
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # Environment variables (not committed)
│   └── .env.example       # Environment variable template
└── Frontend/
    ├── src/
    │   ├── App.jsx        # Main React component
    │   ├── App.css        # Component styles
    │   ├── main.jsx       # React entry point
    │   └── index.css      # Global styles
    ├── public/
    ├── package.json
    ├── vite.config.js
    ├── .env               # Environment variables (not committed)
    └── .env.example       # Environment variable template
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL database (local or [Neon](https://neon.tech))

---

### Backend Setup

```bash
cd Backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env
# Edit .env and fill in your DATABASE_URL

# Run the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

---

### Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Configure environment variables
copy .env.example .env
# Edit .env and set VITE_API_URL if needed

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend — `.env`

| Variable       | Description                              |
| -------------- | ---------------------------------------- |
| `DATABASE_URL` | Full PostgreSQL connection string        |

See `Backend/.env.example` for the full template.

### Frontend — `.env`

| Variable        | Description                 |
| --------------- | --------------------------- |
| `VITE_API_URL`  | Backend base URL (optional) |

See `Frontend/.env.example` for the full template.

---

## API Reference

| Method   | Endpoint           | Description               |
| -------- | ------------------ | ------------------------- |
| `GET`    | `/students`        | Retrieve all students     |
| `GET`    | `/students/{id}`   | Retrieve a single student |
| `POST`   | `/students`        | Create a new student      |
| `PUT`    | `/students/{id}`   | Replace a student record  |
| `PATCH`  | `/students/{id}`   | Partially update a record |
| `DELETE` | `/students/{id}`   | Delete a student record   |

Interactive API docs are available at `http://localhost:8000/docs` (Swagger UI).

---

## Database Schema

```sql
CREATE TABLE students (
  id     INTEGER PRIMARY KEY,
  name   VARCHAR(255),
  course VARCHAR(255)
);
```

---

## Available Scripts

### Frontend

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start development server        |
| `npm run build`   | Build for production            |
| `npm run preview` | Preview production build        |
| `npm run lint`    | Run ESLint                      |

### Backend

| Command                       | Description                        |
| ----------------------------- | ---------------------------------- |
| `uvicorn main:app --reload`   | Start dev server with auto-reload  |
