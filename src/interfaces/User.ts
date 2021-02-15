import { Coupon } from "./Coupon";
import { Order } from "./Order";

export type User = {
  email: string;
  id: string;
  password: string;
  fund: number;
  token?: string;
  booksIds: string[];
  nationality: string;
  orders? : Order[];
  coupons? : Coupon[];
}
