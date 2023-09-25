// Importamos la librería express
import express from 'express'
// Creamos una instancia de express
const app = express()

// Configuración para el servidor
app.use(express.json())

// Definimos el puerto por el cual va a escuchar nuestro servidor
const port = 3000

// Biblioteca
const library = [
  {
    title: 'Lord of the rings',
    author: 'J. R. R. Tolkien'
  }
]

// Obtener todos los libros
app.get('/book', (req, res) => {
  res.json(library)
})

// Crear libro
app.post('/book', (req, res) => {
  // Captura de información
  const book = req.body

  // Inserción del libro a la biblioteca
  library.push(book)

  res.status(201).json({
    message: `Libro almacenado correctamente: ${book.title} de ${book.author}`
  })
})

// levantamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
