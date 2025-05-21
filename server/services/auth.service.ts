import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../db/user.queries";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const usernameExist = await findUserByUsername(username);
  const emailExist = await findUserByEmail(email);
  if (usernameExist || emailExist) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUser(username, email, hashedPassword);
};

export const loginUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "5h",
  });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
