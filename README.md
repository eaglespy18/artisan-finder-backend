# Artisan Finder Backend

Node.js + Express + PostgreSQL backend for Artisan Finder.

## Quick start

1. Copy `.env.example` → `.env` and fill credentials.
2. Ensure PostgreSQL is running and `artisan_finder` DB exists.
3. Run schema (sql/schema.sql) in pgAdmin (you already did).
4. Install deps:
   ```bash
   npm install
Start dev server:

bash
Copy code
npm run dev
Open: http://localhost:5000/artisans (should list seeded artisans)

Endpoints
GET /artisans — list

GET /artisans/:id — details

POST /artisans — create (requires Authorization Header Bearer <token>)

PUT /artisans/:id — update (requires auth)

DELETE /artisans/:id — delete (requires auth)

POST /users/register — register

POST /users/login — login (returns { token })

GET /reviews/:artisanId — get reviews

POST /reviews — create review (requires auth)

markdown
Copy code

---

## 15) How this matches your **frontend**
- Your frontend fetch call in `Search.jsx` (`fetch("http://localhost:5000/artisans")`) will now receive the seeded artisans from the `artisans` table.  
- If your frontend instead uses an `api` wrapper with `VITE_API_URL`, set `VITE_API_URL=http://localhost:5000` in the frontend `.env`.  
- The user login flow will produce a JWT token; your frontend's `api` interceptor can set `Authorization: Bearer <token>` for protected endpoints (you had an interceptor in `api.js` earlier).

---

## 16) How to install & run (step-by-step)
1. Put all files above into `C:\Users\USER\kaf\artisan-finder-backend` (create folders if missing).  
2. Copy `.env.example` → `.env` and update values (you already use port 2433 and password `moha0243`). Example `.env`:

PORT=5000
DB_HOST=localhost
DB_PORT=2433
DB_USER=postgres
DB_PASSWORD=moha0243
DB_NAME=artisan_finder
JWT_SECRET=very_secret_value_here
JWT_EXPIRES_IN=7d

go
Copy code

3. Install dependencies (you already did earlier, but if not):
```sh
npm install
Start server:

sh
Copy code
npm run dev
Test:

List artisans (browser or curl)

sh
Copy code
curl http://localhost:5000/artisans
# or open in browser: http://localhost:5000/artisans
Register a user (Postman or curl)

sh
Copy code
curl -X POST http://localhost:5000/users/register \
 -H "Content-Type: application/json" \
 -d '{"email":"test@example.com","password":"pass1234","name":"Test User"}'
Login:

sh
Copy code
curl -X POST http://localhost:5000/users/login \
 -H "Content-Type: application/json" \
 -d '{"email":"test@example.com","password":"pass1234"}'
Response: { "token": "..." }

Create artisan (use token from login):

sh
Copy code
curl -X POST http://localhost:5000/artisans \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <token>" \
 -d '{"name":"New One","skill":"Electrician","location":"Accra","phone":"+233123","experience":"5 years","description":"Test artisan","rating":4.5,"completedJobs":10}'
17) Security & production notes (short)
Keep .env secret. Use environment variables on host.

Use HTTPS in production.

For production DB, use managed Postgres (Railway/Render/AWS RDS).

Add rate-limiting (express-rate-limit) if public-facing.

Consider stricter validation (express-validator) for POST/PUT bodies.

Troubleshooting & quick checks
If GET /artisans returns empty, open pgAdmin and run:

sql
Copy code
SELECT * FROM artisans ORDER BY id;
If server says DB connection error: confirm .env values and that Postgres is listening on the port you set.

If auth issues: ensure JWT_SECRET matches between issuing and verifying (we use one secret in .env).