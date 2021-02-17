import { Book } from "./models/Book";
import { Reader } from "./models/Reader";
import { Writer } from "./models/Writer";
import fs from "fs";
import { User } from "./interfaces/User";
import { Order } from "./interfaces/Order";
import { v4 } from "uuid";
const booksURI = `${process.cwd()}/files/books.json`;
const writersURI = `${process.cwd()}/files/writers.json`;
const readersURI = `${process.cwd()}/files/readers.json`;

/**
 * Read file and return book, writer or reader array
 * @param uri
 */

export const readBooks = (): Book[] => {
	const anyArray = JSON.parse(fs.readFileSync(booksURI).toString());
	let bookArray: Book[] = [];
	anyArray.map((book: any) => {
		bookArray.push(
			new Book(
				book.title,
				book.price,
				book.launchDate,
				book.genre,
				book.description,
				book.authors,
				book.editors,
				book.reviews
			)
		);
	});
	return bookArray;
};

export const readWriters = (): Writer[] => {
	const anyArray = JSON.parse(fs.readFileSync(writersURI).toString());
	let writerArray: Writer[] = [];
	anyArray.map(
		({ _email, _password, _nationality, _booksIds, _fund, _id, _token }: User) => {
			writerArray.push(
				new Writer(_email, _password, _nationality, _fund, _booksIds, _id, _token)
			);
		}
	);
	return writerArray;
};

export const readReaders = (): Reader[] => {
	const anyArray = JSON.parse(fs.readFileSync(readersURI).toString());
	let readerArray: Reader[] = [];
	anyArray.map(
		({
			_email,
			_id,
			_password,
			_fund,
			_token,
			_booksIds,
			_nationality,
			_orders = [],
			_coupons = [],
		}: User) => {
			readerArray.push(
				new Reader(
					_email,
					_password,
					_nationality,
					_fund,
					_booksIds,
					_orders,
					_coupons,
					_id,
					_token
				)
			);
		}
	);
	return readerArray;
};

export const getBookById = (iId: string): Book | undefined =>
	readBooks().find((book: Book) => book.getId() === iId);

export const getWriterById = (iId: string): Writer | undefined =>
	readWriters().find(({ id }: Writer) => id === iId);

export const getReaderById = (iId: string): Reader | undefined =>
	readReaders().find(({ id }: Reader) => id === iId);

export const makeOrder = (uId: string, order: Order) => {
	const readers = readReaders();
};


export const isBookExists = (bookId: string): boolean => {
	const books = readBooks();
	return books.some(({ getId }) => getId() === bookId)
}


export const isEmailExists = (email: string, role: "READER" | "WRITER") =>
({
	WRITER: readWriters().some(({ email }: Writer) => email === iEmail),
	READER: readReaders().some(({ email }: Reader) => email === iEmail),
}[role]);

export const isPasswordCorrect = (
	iPassword: string,
	role: "READER" | "WRITER"
) =>
({
	WRITER: readWriters().some(
		({ password }: Writer) => password === iPassword
	),
	READER: readReaders().some(
		({ password }: Reader) => password === iPassword
	),
}[role]);

export const writeUser = (email: string, password: string, nationality: string, role: "READER" | "WRITER") => {
	let array: Writer[] | Reader[] = [];
	let uri: string = '';
	({
		WRITER: () => { array = readWriters(); array.push(new Writer(email, password, nationality)); uri = writersURI; },
		READER: () => { array = readReaders(); array.push(new Reader(email, password, nationality)); uri = readersURI; },
	})[role]();

	fs.writeFileSync(uri, JSON.stringify(array, null, 2))
}

export const writeToken = (iEmail: string, role: "READER" | "WRITER"): string => {
	let array: Writer[] | Reader[] = [];
	let uri: string = '';
	const token = v4();
	({
		WRITER: () => { array = readWriters(); array.find(({ email }: Writer) => email === iEmail)!.token = token; uri = writersURI; },
		READER: () => { array = readReaders(); array.find(({ email }: Reader) => email === iEmail)!.token = token; uri = readersURI; },
	})[role]();

	fs.writeFileSync(uri, JSON.stringify(array, null, 2))
	return token;
}

export const writeBook = (title:string,price:number,launchDate:string,genre:string,description:string,authors:string[],editors:string[]) => {
	let newBooks = readBooks();
	newBooks.push(new Book(title,price,0,launchDate,genre,description,authors,editors))
	fs.writeFileSync(booksURI, JSON.stringify(newBooks, null, 2))
}

export const deleteBook = (iId: string): void  => {
	let books = readBooks();
	books = books.filter(({getId}) => getId() !== iId)
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2))
}	

export const editBook = (bId: string, title: string, price: number, description: string): void => {
	let books = readBooks();
	books.map((b: Book) => {
		if (b.getId() === bId) {
			b.setTitle(title)
			b.setPrice(price)
			b.setDescription(description)
		}
	})
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2))
}