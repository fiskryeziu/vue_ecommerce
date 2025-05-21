import { pool } from "./db";

export const findUserByUsername = async (username: string) => {
  const res = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return res.rows[0];
};
export const findUserByEmail = async (email: string) => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string,
) => {
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, hashedPassword],
  );
};
