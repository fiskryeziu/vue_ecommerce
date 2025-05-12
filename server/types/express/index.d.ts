import "express";
//sample
declare module "express" {
  interface Request {
    user?: {
      username: string;
      [key: string]: any;
    };
  }
}
