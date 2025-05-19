import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "username, email, and password are required" });
  }
  try {
    const user = await registerUser(username, email, password);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.cookie("token", token, {
      httpOnly: false,
      // TODO: in prod to true
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user, message: "authorized" });
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
