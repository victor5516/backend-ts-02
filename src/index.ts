// Importamos la librería express
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./server";

dotenv.config({ path: ".env" });
// Definimos el puerto por el cual va a escuchar nuestro servidor
const port = process.env.PORT || 3000;
const connectionString = process.env.DB_CONNECTION;

// Conexión a la base de datos
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
  });

// levantamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
