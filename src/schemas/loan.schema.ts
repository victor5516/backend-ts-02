import {Schema, model} from "mongoose";



const loanSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    loanDays: { type: Number, required: true },

});

const UserBook = model('UserBook', loanSchema)

export default UserBook;