import { Router } from "express";
// Importamos los métodos del controlador
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  loginUser
} from "../../controllers/user.controller";

import {
  createUserMiddleware,
  validateIdMiddleware,
  updateUserMiddleware,
  loginUserMiddleware
} from "../../middlewares/user.middleware";

// creamos una instancia de Router
const router = Router();
//Creamos las rutas
router.get("/user", getUsers);
router.post("/user", createUserMiddleware, createUser);
router.get("/user/:id", validateIdMiddleware, getUser);
router.delete("/user/:id", validateIdMiddleware, deleteUser);
router.put("/user/:id", validateIdMiddleware, updateUserMiddleware, updateUser);
router.post("/user/login", loginUserMiddleware,loginUser);
//Exportamos la ruta

export default router;
