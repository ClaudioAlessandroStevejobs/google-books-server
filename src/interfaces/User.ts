import { Order } from "../interfaces/Order";
export interface User {
  email: string;
  id: string;
  password: string;
  token?: string;
  bookIds: string[];
  orders?: Order[];
  role: "Writer" | "Reader";
  nationality: string;
}
