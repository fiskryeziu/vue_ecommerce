import { AuthPayload } from "../user";
declare module "express" {
  interface Request {
    user?: AuthPayload;
  }
}
