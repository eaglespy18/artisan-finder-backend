# 🛠 Artisan Finder Backend

This is the **backend API** for the Artisan Finder platform.  
It provides RESTful endpoints to manage **artisans, users, and reviews**, built with **Node.js, Express, and PostgreSQL**.

---

## ⚙️ Tech Stack
- **Node.js + Express** → Server & routing  
- **PostgreSQL** → Database  
- **pg (node-postgres)** → Database client  
- **JWT Authentication** → Secure login system  
- **Helmet & CORS** → Security  
- **Morgan** → Request logging  

---

## 📌 Features
- User authentication (Register/Login with JWT)  
- Artisan management (CRUD)  
- Review system (Users can leave reviews for artisans)  
- Validation & error handling (to be added)  
- Logging & monitoring setup with `morgan`

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/<your-backend-repo>.git
cd artisan-finder-backend
2. Install dependencies
bash
Copy code
npm install
3. Setup environment variables
Create a .env file in the root folder:

env
Copy code
PORT=5000
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/artisan_finder
JWT_SECRET=your_jwt_secret
4. Start the server
bash
Copy code
npm run dev
Server will run at:
👉 http://localhost:5000

📡 API Endpoints
Users
POST /users/register → Register a new user

POST /users/login → Login & get JWT

Artisans
GET /artisans → Get all artisans

POST /artisans → Add new artisan

PUT /artisans/:id → Update artisan

DELETE /artisans/:id → Remove artisan

Reviews
GET /reviews → Get all reviews

POST /reviews → Add a review (JWT required)

✅ Next Steps
Add input validation with express-validator

Add advanced logging (Winston / Pino)

Security hardening for production (CORS whitelist, HTTPS, stronger password rules)

Deployment to cloud (Render, Railway, or AWS)

📜 License
MIT License © 2025 Artisan Finder Project