import { User } from "../interfaces/User";
import { v4 } from "uuid";
export class Writer implements User {
  constructor(
    public email: string,
    public password: string,
    public nationality: string,
    public role: "Writer" | "Reader" = "Writer",
    public bookIds: string[],
    public id: string = v4()
  ) {}
}
