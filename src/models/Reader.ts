import { User } from "../interfaces/User";
import { Order } from "../interfaces/Order";
import { v4 } from "uuid";
export class Reader implements User {
  constructor(
    public email: string,
    public password: string,
    public nationality: string,
    public role: "Writer" | "Reader" = "Reader",
    public bookIds: string[],
    public orders: Order[],
    public id: string = v4()
  ) {}
}
