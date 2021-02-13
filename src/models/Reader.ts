import { User } from "../interfaces/User";
import { Order } from "../interfaces/Order";
import { Coupon } from "../interfaces/Coupon";

import { v4 } from "uuid";
export class Reader implements User {
  constructor(
    public email: string,
    public password: string,
    public nationality: string,
    public fund: number,
    public role: "WRITER" | "READER" = "READER",
    public bookIds: string[],
    public coupons: Coupon[],
    public orders: Order[],
    public id: string = v4()
  ) {}

  //aggiungi libro
  //aggiungi coupon
  //aggiungi ordine
}
