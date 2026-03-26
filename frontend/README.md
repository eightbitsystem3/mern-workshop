# React + Vite Setup Guide

## Vite se React Project Setup

### Step 1: Project Create Karo

```bash
npm create vite@latest my-app
```

> Prompt aayega:
> - Select a framework: **React**
> - Select a variant: **JavaScript** (ya JavaScript + SWC)

---

### Step 2: Project Folder me Jao

```bash
cd my-app
```

---

### Step 3: Dependencies Install Karo

```bash
npm install
```

---

### Step 4: Dev Server Start Karo

```bash
npm run dev
```

Browser me open karo: `http://localhost:5173`

---

### Step 5: Production Build

```bash
npm run build
```

### Step 6: Build Preview

```bash
npm run preview
```

---

## Available Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Development server start karo      |
| `npm run build`   | Production ke liye build karo      |

---

## Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — Babel ke saath Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — SWC ke saath Fast Refresh (faster)

---

## Tailwind CSS Setup (Vite ke saath)

> Ye project **Tailwind CSS v4** use karta hai jo `@tailwindcss/vite` plugin ke through kaam karta hai.

### Step 1: Install Karo

```bash
npm install tailwindcss @tailwindcss/vite
```

---

### Step 2: `vite.config.js` me Plugin Add Karo

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

### Step 3: `src/index.css` me Import Karo

```css
@import "tailwindcss";
```

---

### Step 4: `main.jsx` me CSS Import Karo

```jsx
import './index.css'
```

---

### Step 5: Use Karo

Ab kisi bhi component me Tailwind classes directly use kar sakte ho:

```jsx
export default function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-500">
      Hello Tailwind!
    </h1>
  )
}
```

---

> **Note:** Tailwind v4 me `tailwind.config.js` file ki zaroorat nahi hoti — sab kuch automatically handle hota hai.

---

## Backend API Reference (CRUD Operations)

Base URL: `http://localhost:5000`

> Note: Item routes ke liye JWT token cookie required hai (login ke baad automatically set hoti hai).

---

### Auth APIs

#### Register
```
POST /api/users/register
```
Request Body:
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "mobile": "9999999999",
  "password": "yourpassword"
}
```

---

#### Login
```
POST /api/users/login
```
Request Body:
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```
Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "fullname": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### Logout
```
POST /api/users/logout
```

---

### Item CRUD APIs

> Ye sab routes protected hain — pehle login karna zaroori hai.

#### Get All Items
```
GET /api/items
```
Response:
```json
[
  { "_id": "item_id", "name": "Item 1", "createdAt": "..." },
  ...
]
```

---

#### Create Item
```
POST /api/items
```
Request Body:
```json
{
  "name": "New Item",
  "description": "Item description"
}
```

---

#### Update Item
```
PUT /api/items/:id
```
Request Body:
```json
{
  "name": "Updated Name"
}
```

---

#### Delete Item
```
DELETE /api/items/:id
```
Response:
```json
{
  "message": "Deleted successfully"
}
```

---

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middlewares/    # Auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   └── utils/          # DB, JWT, helpers
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```
