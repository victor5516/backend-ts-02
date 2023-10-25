import { NextFunction, Request, Response } from "express";
// Importamos el modelo
// import User from "../models/user.interface";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
  loginUserService
} from "../services/user.service";
import { ErrorHandler } from "../handlers/error.handler";
import { ResponseHandler } from "../handlers/response.handler";

//Definimos el metodos
//Metodo controlador

export const getUsers = async (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersService();
    next(new ResponseHandler(200, users));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  //Obtenemos el valor del id.
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      throw new ErrorHandler(404, "Usuario no encontrado ⚠");
    }
    next(new ResponseHandler(200, user, "Usuario encontrado ✅"));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const userId = await createUserService(body);
    if (!userId) {
      throw new ErrorHandler(400, "Usuario ya existe ⚠");
    }
    next(
      new ResponseHandler(
        201,
        userId,
        `Usuario creado correctamente: ${userId}`
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await updateUserService(id, body);

    if (!user) {
      throw new ErrorHandler(400, "Usuario no encontrado ⚠");
    }

    next(
      new ResponseHandler(202, user, "Usuario actualizado correctamente ✅")
    );
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = await deleteUserService(id);
    if (!userId) {
      throw new ErrorHandler(400, "Usuario no encontrado ⚠");
    }

    next(
      new ResponseHandler(
        202,
        userId,
        `Usuario ${userId}👤 fue eliminado correctamente`
      )
    );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const token = await loginUserService(email, password);

  if(!token) {
    throw new ErrorHandler(400, 'Email o contraseña incorrectos ⚠')
  }
  const result = {
    token,
    email
  }
  next(new ResponseHandler(200, result, 'Usuario logueado correctamente ✅'))



}
