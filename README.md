# MERN CI/CD Demo

A small MERN stack Todo application designed for practicing:

- React + Vite
- Context API
- Node.js + Express
- MongoDB + Mongoose
- `.env` files for frontend and backend
- Frontend ↔ Backend REST API communication
- Docker / Docker Hub / GitHub Actions / Render deployment later

## Project structure

```text
mern-cicd-demo/
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── .gitignore
```

## 1. Backend setup

```bash
cd backend
npm install
```

Create a file named `.env`:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
FRONTEND_URL=http://localhost:5173
```

Replace `YOUR_MONGODB_ATLAS_CONNECTION_STRING` with your MongoDB connection string.

Start backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 2. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open the URL Vite prints, normally:

```text
http://localhost:5173
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend |
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

## Important

Do NOT commit your real `.env` files. They are ignored by `.gitignore`.

The frontend `.env` uses the Vite-required `VITE_` prefix because only variables with that prefix are exposed to browser code.

After the local application works, the next step can be:

```text
GitHub
   ↓
GitHub Actions
   ↓
Docker
   ↓
Docker Hub
   ↓
Render
```

For the backend, we can add a Dockerfile and CI/CD workflow after you verify the application locally.
