import { Router } from "express";
// Importamos los métodos del controlador
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../../controllers/library.controller";
import { verifyTokenMiddleware } from "../../middlewares/auth.middleware";
const middlewares = [verifyTokenMiddleware]
// creamos una instancia de Router
const router = Router();
// definimos las rutas usando los metodos del controlador
router.get("/book",middlewares, getBooks);
router.get("/book/:id",middlewares, getBook);
router.post("/book",middlewares, createBook);
router.put("/book/:id",middlewares, updateBook);
router.delete("/book/:id",middlewares, deleteBook);

// exportamos el router
export default router;
