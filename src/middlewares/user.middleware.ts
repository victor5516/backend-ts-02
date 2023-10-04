import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";

export const getUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const { id } = req.params;

  //   if (id !== "651d5c90ed66037f09fd48b9") {
  //     return res.status(404).json({ message: "este id no es valido" });
  //   }

  await checkSchema({
    id: {
      in: ["params"],
      isMongoId: {
        errorMessage: "El id no es un id válido de mongo",
      },
    },
  }).run(req);

  const errors = validationResult(req);
  console.log(errors.isEmpty());
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }

  next();
};

export const createUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkSchema({
    name: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Este campo es requerido",
      },
    },
    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Este campo es requerido",
      },
    },
    email: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Este campo es requerido",
      },
      isEmail: {
        errorMessage: "El email no tiene un formato válido",
      },
    },
  }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }

  next();
};
