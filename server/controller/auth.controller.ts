import type { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await authService.registerUser(username, password);
  res.status(201).json({ message: "User created", user });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await authService.loginUser(username, password);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3600000,
  });
  res.json({ message: "Logged in successfully" });
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
