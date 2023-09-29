import { Router } from "express";
// Importamos los métodos del controlador
import { getUsers, createUser , getUser, deleteUser, updateUser} from "../controllers/user.controller";

// creamos una instancia de Router
const router = Router()
//Creamos las rutas
router.get('/user', getUsers);
router.post('/user', createUser);
router.get('/user/:id', getUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);
//Exportamos la ruta

export default router;