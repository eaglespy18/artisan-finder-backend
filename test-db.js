 // test-db.js
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 2433, // your PostgreSQL port
  user: "postgres", // default PostgreSQL user
  password: "moha0243", // your password
  database: "artisan_finder" // the DB you created
});

client
  .connect()
  .then(() => {
    console.log("✅ Connected successfully to artisan_finder DB");
    return client.end();
  })
  .catch((err) => {
    console.error("❌ Connection error:", err);
  });

