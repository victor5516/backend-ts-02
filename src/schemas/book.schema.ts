import {Schema, model} from "mongoose";



const bookSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: String,
    author: { type: String, required: true, index: true },
    available: { type: Boolean, default: true },
    code: { type: String, required: true, index: true, minlength: 5, unique: true },
})

const Book = model('Book', bookSchema)

export default Book;

