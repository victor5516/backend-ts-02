import express from "express";
import bodyParser from "body-parser";

// Importamos las rutas
import libraryRoutes from "./routes/library.routes";
import userRoutes from "./routes/user.routes";

import { handleError } from "../handlers/error.handler";
import { handleResponse } from "../handlers/response.handler";
import { verifyTokenMiddleware } from "../middlewares/user.middleware"
// Creamos una instancia de express
const app = express();
// Configuración para el servidor
app.use(express.json());

//usamos body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definimos las rutas por convención se usa /api/v1
app.use("/api/v1", verifyTokenMiddleware, libraryRoutes);
app.use("/api/v1", userRoutes);

app.use(handleResponse);
// Ultimo middleware
app.use(handleError);

export default app;
