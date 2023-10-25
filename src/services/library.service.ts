import fs from 'fs';
import IBook from '../models/book.interface';
import Book from '../schemas/book.schema';



export const createBookService = async (book: IBook) => {
    const newBook = new Book(book);
    await newBook.save();
    return newBook;
}

export const getBooksService = async (query: any) => {
    let filter = {};
    const { title, author, code } = query;
    if(title) filter['title'] = title;
    if(author) filter['author'] = author;
    if(code) filter['code'] = code;


    const books: IBook[] = await Book.find(filter);

    return books;
}

export const getBookService = async (id: string) => {
    const book: IBook = await Book.findById(id);
    return book;
}

export const updateBookService = async (id: string, book: IBook) => {

 const updateBook:IBook = await Book.findByIdAndUpdate(id, book, {new: true});
 return updateBook;
}

export const deleteBookService = async (id: string) => {
    const deleteBook:IBook = await Book.findByIdAndDelete(id);
    return deleteBook;
}

// quedaria fuera de uso
// definimos la ruta del archivo
const libraryPath = './data/library.json';
// Definimos los métodos
// se encarga de leer el archivo y retornar la biblioteca al controlador
export const readFile = () => {
    // leemos el archivo
    const books: string = fs.readFileSync(libraryPath, 'utf-8');
    // parseamos el archivo a JSON
    const library: IBook[] = JSON.parse(books);
    return library;
}

export const writeFile = (data: IBook[]) => {
    // guardamos el archivo
    fs.writeFileSync(libraryPath, JSON.stringify(data));
}

