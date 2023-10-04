import { Router } from "express";
// Importamos los métodos del controlador
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../../controllers/user.controller";

import {
  createUserMiddleware,
  getUserMiddleware,
} from "../../middlewares/user.middleware";

// creamos una instancia de Router
const router = Router();
//Creamos las rutas
router.get("/user", getUsers);
router.post("/user", createUserMiddleware, createUser);
router.get("/user/:id", getUserMiddleware, getUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
//Exportamos la ruta

export default router;
