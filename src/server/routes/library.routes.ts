import { Router } from "express";
// Importamos los métodos del controlador
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../../controllers/library.controller";
// creamos una instancia de Router
const router = Router();
// definimos las rutas usando los metodos del controlador
router.get("/book", getBooks);
router.get("/book/:id", getBook);
router.post("/book", createBook);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

// exportamos el router
export default router;
