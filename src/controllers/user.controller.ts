import { Request, Response } from "express";
// Importamos el modelo
// import User from "../models/user.interface";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/user.service";

//Definimos el metodos
//Metodo controlador
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  //Obtenemos el valor del id.
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado ❌" });
    }
    return res.status(200).json({ message: "Usuario encontrado ✅", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const userId = await createUserService(body);
    return res.status(201).json({
      message: `Usuario creado correctamente: ${userId}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await updateUserService(id, body);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado ❌" });
    }

    return res
      .status(202)
      .json({ message: "Usuario actualizado correctamente ✅", user });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = await deleteUserService(id);
    if (!userId) {
      return res.status(404).json({ message: "Usuario no encontrado ❌" });
    }
    return res
      .status(200)
      .json({ message: `Usuario ${userId}👤 fue eliminado correctamente` });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};
