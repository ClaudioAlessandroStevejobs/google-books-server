export interface User {
  email: string;
  id: string;
  password: string;
  fund: number;
  token?: string;
  bookIds: string[];
  nationality: string;
}
