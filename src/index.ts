// Importamos la librería express
import express from 'express'
import bodyParser from 'body-parser'
// Importamos las rutas
import libraryRoutes from './routes/library.routes'
import userRoutes from './routes/user.routes'
// Creamos una instancia de express
const app = express()

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

// levantamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
