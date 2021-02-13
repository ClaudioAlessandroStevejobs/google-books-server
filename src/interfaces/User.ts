export interface User {
  email: string;
  id: string;
  password: string;
  fund: number;
  token?: string;
  bookIds: string[];
  role: "WRITER" | "READER";
  nationality: string;
}
