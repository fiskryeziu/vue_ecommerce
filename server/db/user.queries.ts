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

export const queryUpdateProfile = async (
  username: string,
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    street: string;
  },
) => {
  const { first_name, last_name, email, phone, street } = profile;

  const query = `
    UPDATE users
    SET 
      first_name = $1,
      last_name = $2,
      email = $3,
      phone = $4,
      street = $5
    WHERE username = $6
  `;

  await pool.query(query, [
    first_name,
    last_name,
    email,
    phone,
    street,
    username,
  ]);
};

export const updateUserPassword = async (
  username: string,
  hashedPassword: string,
) => {
  return await pool.query(
    `UPDATE users SET password = $1 WHERE username = $2`,
    [hashedPassword, username],
  );
};
