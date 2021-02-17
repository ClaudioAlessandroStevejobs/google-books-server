import { Coupon } from "./Coupon";
import { Order } from "./Order";

// export type User ={
//     _email: string;
//     _id: string;
//     _password: string;
//     _fund: number;
//     _token?: string;
//     _booksIds: string[];
//     _nationality: string;
//     _orders?: Order[];
//     _coupons?: Coupon[];
// }

interface Writer {
    _email: string,
    _password: string,
    _nationality: string,
    _fund: number,
    _booksIds: string[],
    _id: string,
    _token?: string,
}

interface Reader {
    _email: string,
    _password: string,
    _nationality: string,
    _fund: number,
    _booksIds: string[],
    _orders: Order[],
    _coupons: Coupon[],
    _id: string,
    _token?: string,
}

export type User = Writer & Reader;
