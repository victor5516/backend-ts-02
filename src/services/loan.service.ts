import { createLoanStorage, updateLoanStorage, getByIdLoanStorage, getLoansStorage } from "../storage/loan.storage";
import { getUserByIdStorage } from "../storage/user.storage";
import {ILoan} from "../models/loan.interface";
import Book from "../schemas/book.schema";
import IBook from "../models/book.interface";
import { ISecureUser } from "../models/user.interface";

export const createLoanService = async (userId: string, bookId: string, loanDays: number) => {
  const user = await getUserByIdStorage(userId);
  if (!user) return null;
  const book = await Book.findById(bookId);

  if (!book) return null;

  if(!book.available) return null;

  const userBook = {
    user: userId,
    book: bookId,
    startDate: new Date(),
    endDate: null,
    loanDays,
  }

    const newUserBook = await createLoanStorage(userBook);
    //acutalizar la disponibilidad del libro
    book.available = false;
    await book.save();
    return {
        book: book as IBook,
        userBook: newUserBook
    };


};

export  const refundService = async (id: string) => {
  const loan = await getByIdLoanStorage(id);
  if (!loan) return null;
  const book = await Book.findById(loan.book);
  if (!book) return null;
  const user = await getUserByIdStorage(loan.user as string);
  if (!user) return null;

  loan.endDate = new Date();
  await updateLoanStorage(id, loan);
  book.available = true;
  await book.save();

  return {
    book: book as IBook,
    user: user,
    loan,
  };

};

export const getLoansService = async () => {

  const loans = await getLoansStorage();
  if(!loans || loans.length === 0) return null;

  const serializedLoans = loans.map(loan => {
    const book = loan.book as IBook;
    const user = loan.user as ISecureUser;
    return {
      book: {
        title: book.title,
        code: book.code,
      },
      user: {
        name: user.name,
        email: user.email,
      },
      loan: {
        startDate: loan.startDate,
        endDate: loan.endDate,
        loanDays: loan.loanDays,
        id: loan._id,
      }
    }
})


  return serializedLoans;


}


