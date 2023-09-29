// Objetivo: Controlador de la biblioteca
import {Request, Response} from "express";
// Importamos el modelo
import  Book  from "../models/book.interface";
import { readFile, writeFile } from "../services/library.service";
import { v4 as uuid } from 'uuid'

// Definimos los métodos
export const getBooks = (req: Request, res: Response) => {
    const library: Book[] = readFile()
    if (library.length === 0) {
        return res.status(404).json({ message: 'No hay libros en la biblioteca' })
    }
    return res.status(200).json(library)
}

export const getBook = (req: Request, res: Response) => {
    const { id } = req.params
    // leemos el archivo
    const library: Book[] = readFile()
    // buscamos el libro
    const book = library.find((book) => book.id === id)
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' })
    }
    return res.status(200).json(book)
}

export const createBook = (req: Request, res: Response) => {
   const body = req.body
    const library: Book[] = readFile()
    // Inserción del libro a la biblioteca
    library.push({ id: uuid(), ...body })
    // guardamos el archivo
    writeFile(library)

    return res.status(201).json({
        message: `Libro almacenado correctamente: ${body.title} de ${body.author}`
    })


}

export const updateBook = (req: Request, res: Response) => {
    const { id } = req.params
    const body = req.body

    const library: Book[] = readFile()
    // buscamos el libro
    const book = library.find((book) => book.id === id)
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' })
    }
    book.title = body.title
    book.author = body.author
    // guardamos el archivo
    writeFile(library)
    return res.status(202).json({ message: 'Libro actualizado correctamente' })


}

export const deleteBook = (req: Request, res: Response) => {
    const {id} = req.params

    const library: Book[] = readFile()
    // buscamos el libro
    const book = library.find((book) => book.id === id)
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' })
    }
    const filterBooks = library.filter((book) => book.id !== id)
    // guardamos el archivo
    writeFile(filterBooks)
    return res.status(200).json({ message: `Libro ${book.title} fue eliminado correctamente` })
}
