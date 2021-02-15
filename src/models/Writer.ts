import { v4 } from "uuid";
export class Writer {
	constructor(
		private email: string,
		private password: string,
		private nationality: string,
		private fund: number,
		private booksIds: string[] = [],
		private id: string = v4(),
		private token?: string
	) { }

	getEmail = () => this.email;
	getPassword = () => this.password;
	getNationality = () => this.nationality;
	getFund = () => this.fund;
	setFund = (fund: number) => { this.fund = fund }
	getBooksIds = () => this.booksIds;
	addBookId = (bId: string) => { this.booksIds.push(bId) }
	getToken = () => this.token;
	setToken = (token: string) => this.token = token;
	getId = () => this.id;
}
