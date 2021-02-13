export interface User {
    email: string;
    id: string;
    password: string;
    token?: string;
    bookIds: string [];
    orders: [];
    role: 'Writer' | 'Reader';
    nationality: string;
}