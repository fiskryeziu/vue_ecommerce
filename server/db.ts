import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL 🚀"))
  .catch((err) => console.error("Connection error:", err));
