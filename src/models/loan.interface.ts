import IBook from "./book.interface";
import { ISecureUser} from "./user.interface";

export interface ILoan {
    _id: string;
    user: string | ISecureUser;
    book: string | IBook;
    startDate: Date;
    endDate: Date | null;
    loanDays: number;
}

