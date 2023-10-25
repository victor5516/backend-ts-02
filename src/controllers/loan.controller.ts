import { NextFunction, Request, Response, response } from "express";
import { ResponseHandler } from "../handlers/response.handler";
import { ErrorHandler } from "../handlers/error.handler";
import { createLoanService, refundService, getLoansService  } from "../services/loan.service";




export const getLoans = async (req: Request, _res: Response,  next: NextFunction) => {

    const loans = await getLoansService();

    if(!loans)
    {
        next(new ErrorHandler(400, "No se pudo obtener los prestamos"));
        return;
    }

     const response = {
        loans
     }
     next(new ResponseHandler(200, response, "Prestamos obtenidos correctamente"))

}


export const createLoan = async (req: Request, _res: Response,  next: NextFunction) => {
    const body = req.body;
    const userId = body.user._id;
    const bookId = body.bookId;
    const loanDays = body.loanDays;

    const userBook = await createLoanService(userId, bookId, loanDays);

    if(!userBook)
    {
        next(new ErrorHandler(400, "No se pudo prestar el libro"));
        return;
    }
    const response = {
        name: userBook.book.title,
        code: userBook.book.code,
        loanDays: userBook.userBook.loanDays,
        startDate: userBook.userBook.startDate,
    }
     next(new ResponseHandler(200, response, "Libro prestado correctamente"))



}

export const refund = async (req: Request, _res: Response,  next: NextFunction) => {

    const { id }= req.params;
    const loan = await refundService(id);
    if(!loan)
    {
        next(new ErrorHandler(400, "No se pudo regresar el libro"));
        return;
    }

    const response = {
        name: loan.book.title,
        code: loan.book.code,
        loanDays: loan.loan.loanDays,
        startDate: loan.loan.startDate,
        endDate: loan.loan.endDate,
    }
     next(new ResponseHandler(200, response, "Libro regresado correctamente"))

}