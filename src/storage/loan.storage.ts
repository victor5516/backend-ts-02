import  { ILoan}  from '../models/loan.interface';
import Loan from '../schemas/loan.schema';


export const createLoanStorage = async (loan) => {
    const newLoan = new Loan(loan);
    await newLoan.save();
    return newLoan;
}

export const updateLoanStorage = async (id: string, loan: Partial<ILoan>) => {
    const updatedLoan: ILoan = await Loan.findByIdAndUpdate(id, loan, {new: true});
    return updatedLoan;
}

export const getByIdLoanStorage = async (id: string) => {
    const loan: ILoan = await Loan.findById(id);
    return loan;
}

export const getLoansStorage = async () => {
    const loans: ILoan[] = await Loan.find().populate('user').populate('book');
    return loans;
}