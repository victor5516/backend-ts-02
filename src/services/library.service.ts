import fs from 'fs';
import Book from '../models/book.interface';

// definimos la ruta del archivo

const libraryPath = './data/library.json';

// Definimos los métodos
// se encarga de leer el archivo y retornar la biblioteca al controlador
export const readFile = () => {
    // leemos el archivo
    const books: string = fs.readFileSync(libraryPath, 'utf-8');
    // parseamos el archivo a JSON
    const library: Book[] = JSON.parse(books);
    return library;
}

export const writeFile = (data: Book[]) => {
    // guardamos el archivo
    fs.writeFileSync(libraryPath, JSON.stringify(data));
}

