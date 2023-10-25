import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { ErrorHandler } from "../handlers/error.handler";
import { formatRequestError } from "../utils";
import jwt from "jsonwebtoken";
export const validateIdMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  await checkSchema({
    id: {
      in: ["params"],
      isMongoId: {
        errorMessage: "El id no es un id válido de mongo",
      },
    },
  }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ErrorHandler(406, formatRequestError(errors.array())));
  }

  next();
};

export const createUserMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  await checkSchema({
    name: {
      in: ["body"],
      notEmpty: {
        errorMessage: "El campo name es requerido",
      },
    },
    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: "El campo password es requerido",
        bail: true,
      },
      isLength: {
        options: { min: 8 },
        errorMessage: "La contraseña debe tener al menos 8 caracteres",
      },
    },
    email: {
      in: ["body"],
      notEmpty: {
        errorMessage: "El campo email requerido",
        bail: true,
      },
      isEmail: {
        errorMessage: "El email no tiene un formato válido",
      },
    },
  }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ErrorHandler(406, formatRequestError(errors.array())));
  }

  next();
};

export const updateUserMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  await checkSchema({
    name: {
      in: ["body"],
      optional: true,
      isString: {
        errorMessage: "El campo name deber ser una cadena de texto",
      },
    },
    password: {
      in: ["body"],
      optional: true,
      isLength: {
        options: { min: 8 },
        errorMessage: "La contraseña debe tener al menos 8 caracteres",
      },
    },
    email: {
      in: ["body"],
      optional: true,
      isEmail: {
        errorMessage: "El email no tiene un formato válido",
      },
    },
  }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ErrorHandler(406, formatRequestError(errors.array())));
  }
  next();
};

export const loginUserMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  await checkSchema({
    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: "El campo password es requerido",
        bail: true,
      },
    },
    email: {
      in: ["body"],
      notEmpty: {
        errorMessage: "El campo email requerido",
        bail: true,
      },
      isEmail: {
        errorMessage: "El email no tiene un formato válido",
      },
    },
  }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ErrorHandler(406, formatRequestError(errors.array())));
  }

  next();
}

