// Importamos la librería express
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// Importamos las rutas
import libraryRoutes from './routes/library.routes'
import userRoutes from './routes/user.routes'
// Creamos una instancia de express
const app = express()
const connectionString = ''
// Configuración para el servidor
app.use(express.json())

//usamos body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

// Definimos las rutas por convención se usa /api/v1
app.use('/api/v1', libraryRoutes)
app.use('/api/v1', userRoutes)

// Definimos el puerto por el cual va a escuchar nuestro servidor
const port: Number = 3000

// Conexión a la base de datos
   mongoose.connect(connectionString).then(() => {
    console.log("Conectado a la base de datos");
  }
  ).catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
  });

// levantamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
