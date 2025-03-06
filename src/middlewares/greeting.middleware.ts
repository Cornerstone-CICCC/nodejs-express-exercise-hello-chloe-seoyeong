import { NextFunction, Request, Response } from "express";

export function greeting(req: Request, res: Response, next: NextFunction) {
  console.log("Welcome to express exercise!");
  next();
}
