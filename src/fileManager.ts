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
		({ email, password, nationality, booksIds, fund, id, token }: User) => {
			writerArray.push(
				new Writer(email, password, nationality, fund, booksIds, id, token)
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
			email,
			id,
			password,
			fund,
			token,
			booksIds,
			nationality,
			orders = [],
			coupons = [],
		}: User) => {
			readerArray.push(
				new Reader(
					email,
					password,
					nationality,
					fund,
					booksIds,
					orders,
					coupons,
					id,
					token
				)
			);
		}
	);
	return readerArray;
};

export const getBookById = (iId: string): Book | undefined =>
	readBooks().find((book: Book) => book.getId() === iId);

export const getWriterById = (iId: string): Writer | undefined =>
	readWriters().find((writer: Writer) => writer.getId() === iId);

export const getReaderById = (iId: string): Reader | undefined =>
	readReaders().find((reader: Reader) => reader.getId() === iId);

export const getReaderByToken = (token: string): Reader | undefined =>
	readReaders().find((reader: Reader) => reader.getToken() === token);

export const getWriterByToken = (token: string): Writer | undefined =>
	readWriters().find((writer: Writer) => writer.getToken() === token);

export const makeOrder = (uId: string, order: Order) => {
	const readers = readReaders();
};

export const isEmailExists = (email: string, role: "READER" | "WRITER") =>
({
	WRITER: readWriters().some((writer: Writer) => writer.getEmail() === email),
	READER: readReaders().some((reader: Reader) => reader.getEmail() === email),
}[role]);

export const isPasswordCorrect = (
	password: string,
	role: "READER" | "WRITER"
) =>
({
	WRITER: readWriters().some(
		(writer: Writer) => writer.getPassword() === password
	),
	READER: readReaders().some(
		(reader: Reader) => reader.getPassword() === password
	),
}[role]);

export const writeUser = (user: Writer | Reader, role: "READER" | "WRITER") => {
	let array: Writer[] | Reader[] = [];
	let uri: string = '';
	({
		WRITER: () => { array = readWriters(); array.push(user as Writer); uri = writersURI; },
		READER: () => { array = readReaders(); array.push(user as Reader); uri = readersURI; },
	})[role]();

	fs.writeFileSync(uri, JSON.stringify(array, null, 2))
}

export const writeToken = (email: string, role: "READER" | "WRITER"): string => {
	let array: Writer[] | Reader[] = [];
	let uri: string = '';
	const token = v4();
	({
		WRITER: () => { array = readWriters(); array.find(writer => writer.getEmail() === email)!.setToken(token); uri = writersURI; },
		READER: () => { array = readReaders(); array.find(writer => writer.getEmail() === email)!.setToken(token); uri = readersURI; },
	})[role]();

	fs.writeFileSync(uri, JSON.stringify(array, null, 2))
	return token;
}
