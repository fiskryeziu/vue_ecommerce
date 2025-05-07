import express, { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { pool } from "./db";

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

const usersFilePath = path.join(__dirname, "users.json");

const loadUsers = (): { username: string; password: string }[] => {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  }
  return [];
};

const saveUsers = (users: { username: string; password: string }[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

console.log(SECRET_KEY);

app.get("/", (_, res) => {
  res.send("Hello");
});

// Signup Route
app.post("/api/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const users = loadUsers();

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  saveUsers(users);

  res.json({ message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const users = loadUsers();

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: "Logged in successfully" });
});

app.post("/api/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    res.json({ username: decoded.username });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

async function testPoolConnection() {
  try {
    const client = await pool.connect(); // Get a client from the pool
    console.log("Connection successful!");

    // Execute a simple query
    const res = await client.query("SELECT NOW()");
    console.log("Current time from DB:", res.rows[0]);

    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
  }
}

testPoolConnection();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
