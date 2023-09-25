// Importamos la librería express
import express from 'express'
import { v4 as uuid } from 'uuid'
// Creamos una instancia de express
const app = express()

// Configuración para el servidor
app.use(express.json())

// Definimos el puerto por el cual va a escuchar nuestro servidor
const port = 3000

// Biblioteca
let library = [
  {
    id: '79cefe27-84ec-4fee-8fa7-e75473487bdb',
    title: 'Lord of the rings',
    author: 'J. R. R. Tolkien'
  }
]

// Obtener todos los libros
app.get('/book', (req, res) => {
  res.json(library)
})

// Obtener un solo libro
app.get('/book/:id', (req, res) => {
  const { id } = req.params

  const book = library.find((book) => book.id === id)

  if (!book) {
    return res.status(404).json({ message: 'Libro no encontrado' })
  }

  res.json({ message: 'Libro encontrado!', book })
})

// Editar un solo libro
app.put('/book/:id', (req, res) => {
  const { id } = req.params
  const body = req.body

  const book = library.find((book) => book.id === id)

  if (!book) {
    return res.status(404).json({ message: 'Libro no encontrado' })
  }

  book.title = body.title
  book.author = body.author

  res.status(202).json({ message: 'Libro actualizado correctamente' })
})

// Eliminar libro
app.delete('/book/:id', (req, res) => {
  const { id } = req.params

  const book = library.find((book) => book.id === id)

  if (!book) {
    return res.status(404).json({ message: 'Libro no encontrado' })
  }

  const filterBooks = library.filter((book) => book.id !== id)

  library = filterBooks

  res.json({ message: `Libro ${book.title} fue eliminado correctamente` })
})

// Crear libro
app.post('/book', (req, res) => {
  // Captura de información
  const book = req.body

  // Inserción del libro a la biblioteca
  library.push({ id: uuid(), ...book })

  res.status(201).json({
    message: `Libro almacenado correctamente: ${book.title} de ${book.author}`
  })
})

// levantamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
