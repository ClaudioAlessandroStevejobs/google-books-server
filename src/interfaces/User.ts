import { Coupon } from "./Coupon";
import { Order } from "./Order";

// export type User = {
//   email: string;
//   id: string;
//   password: string;
//   fund: number;
//   token?: string;
//   booksIds: string[];
//   nationality: string;
//   orders?: Order[];
//   coupons?: Coupon[];
// }

interface Writer {
    email: string,
    password: string,
    nationality: string,
    fund: number,
    booksIds: string[],
    id: string,
    token?: string,
}

interface Reader {
    email: string,
    password: string,
    nationality: string,
    fund: number,
    booksIds: string[],
    orders: Order[],
    coupons: Coupon[],
    id: string,
    token?: string,
}

export type User = Writer & Reader;
