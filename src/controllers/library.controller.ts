// Objetivo: Controlador de la biblioteca
import {Request, Response} from "express";
// Importamos el modelo
import  IBook  from "../models/book.interface";
import {  createBookService, getBooksService, getBookService, updateBookService, deleteBookService } from "../services/library.service";


// Definimos los métodos
export const getBooks = async (req: Request, res: Response) => {
    const library: IBook[] = await getBooksService()
    if (library.length === 0) {
        return res.status(404).json({ message: 'No hay libros en la biblioteca' })
    }
    return res.status(200).json(library)
}

export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params
    const book = await getBookService(id)

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' })
    }
    return res.status(200).json(book)
}

export const createBook = async (req: Request, res: Response) => {
   const body = req.body
   const book = await createBookService(body)


    return res.status(201).json({
        message: `Libro almacenado correctamente: ${book.title} de ${book.author}`
    })


}

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params
    const body = req.body

    const book = await updateBookService(id, body)

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' })
    }

    return res.status(202).json({ message: 'Libro actualizado correctamente' })


}

export const deleteBook =  async (req: Request, res: Response) => {
    const {id} = req.params

    const book = await deleteBookService(id)

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' })
    }

    return res.status(200).json({ message: `Libro ${book.title} fue eliminado correctamente` })
}
