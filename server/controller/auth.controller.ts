import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import {
  findUserByEmail,
  findUserByUsername,
  queryUpdateProfile,
  updateUserPassword,
} from "../db/user.queries";
import bcrypt from "bcryptjs";

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
    const { token, user } = await loginUser(username, password);
    res.cookie("token", token, {
      httpOnly: false,
      // TODO: in prod to true
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.status(200).json({ user, message: "Logged in successfully" });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const me = async (req: Request, res: Response) => {
  const usernameReq = req.user?.username;
  if (!usernameReq) return res.status(400).json({ message: "Invalid user" });

  const user = await findUserByUsername(usernameReq);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { id, username, email, phone, street, first_name, last_name } = user;
  res.json({
    user: { id, username, email, phone, street, first_name, last_name },
    message: "authorized",
  });
};
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) return res.status(400).json({ message: "No username" });

    const {
      first_name,
      last_name,
      email,
      phone,
      street,
      current_password,
      new_password,
      confirm_password,
    } = req.body;

    const user = await findUserByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const emailExist = await findUserByEmail(email);
      if (emailExist && emailExist.username !== username) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    await queryUpdateProfile(username, {
      first_name,
      last_name,
      email,
      phone,
      street,
    });

    // If password change is requested
    if (current_password || new_password || confirm_password) {
      if (!current_password || !new_password || !confirm_password) {
        return res
          .status(400)
          .json({ message: "All password fields are required" });
      }

      if (new_password !== confirm_password) {
        return res.status(400).json({ message: "New passwords do not match" });
      }

      const isMatch = await bcrypt.compare(current_password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      const hashed = await bcrypt.hash(new_password, 10);
      await updateUserPassword(username, hashed);
      console.log("updated profile");
    }

    return res.json({
      message: "Profile updated",
      user: {
        first_name,
        last_name,
        email,
        phone,
        street,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.sendStatus(200);
};
