 # Artisan Finder Backend

Backend API for the **Artisan Finder** project.  
Built with **Node.js, Express, and PostgreSQL** to handle authentication, artisan management, reviews, and admin features.

---
## 🚀 Features
- User authentication with JWT (Register/Login).
- Role-based authorization (User, Admin).
- CRUD APIs:
  - Users
  - Artisans
  - Reviews
- Secure middleware:
  - Validation
  - Error handling
  - CORS + Helmet
  - Rate limiting
- PostgreSQL database integration.
- Ready for deployment (Heroku, Render, Vercel, or Docker).

---
## 📂 Project Structure
artisan-finder-backend/
│── config/  
│   └── db.js # Database connection  
│── controllers/ # Business logic  
│── middleware/ # Auth, validation, error handlers  
│── models/ # Prisma models or SQL queries  
│── routes/ # API endpoints  
│── utils/ # Helpers, logging, etc.  
│── server.js # App entry point  
│── .env.example # Environment variables template  
│── package.json  
│── README.md  

---
## ⚙️ Setup Instructions
### 1️⃣ Clone the repository
```sh
git clone https://github.com/eaglespy18/artisan-finder-backend.git
cd artisan-finder-backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file in the root:

PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/artisan_finder
JWT_SECRET=your_jwt_secret_key

4️⃣ Run database migrations
npx prisma migrate dev

👨‍💻 Author

Mohammed Khidir (AMK)
Backend Developer & Footballer ⚽
