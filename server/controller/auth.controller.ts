import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

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

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export const signup = async (req: Request, res: Response) => {
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
};

export const login = async (req: Request, res: Response) => {
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
};

export const me = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    res.json({ username: decoded.username });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
