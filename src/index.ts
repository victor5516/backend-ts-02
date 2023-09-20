// importamos la libreria express
import express from 'express';
// creamos una instancia de express
const app = express();
// definimos el puerto por el cual va a escuchar nuestro servidor
const port = 3000;
// definimos una ruta de tipo GET
app.get('/', (req, res) => {
  res.send('HELLO TS');
});
// levantamos el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });