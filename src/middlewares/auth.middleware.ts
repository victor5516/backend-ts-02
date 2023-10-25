import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../handlers/error.handler";
import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const token = req.header('auth-token');
    if (!token) {
      next(new ErrorHandler(401, "No se ha enviado un token de autorización"));
    }

    try{
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.user = tokenPayload;
    next();
    } catch (error) {
      console.log(error);
      next( new ErrorHandler(401, "Usuario no autorizado"));
    }
}