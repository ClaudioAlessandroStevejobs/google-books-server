import { Book } from "./models/Book";
import { Reader } from "./models/Reader";
import { Writer } from "./models/Writer";
import fs from 'fs';
import { User } from "./interfaces/User";
const booksURI = `${process.cwd()}/files/books.json`;
const usersURI = `${process.cwd()}/files/users.json`;


/**
 * Read file and return book, writer or reader array
 * @param uri 
 */

export const readBooks = (): Book[] => {
	const anyArray = JSON.parse(fs.readFileSync(booksURI).toString());
		let bookArray : Book[] = [];
		anyArray.map((book: any)=> {
			bookArray.push(
				new Book(
					book.title, 
					book.price, book.launchDate, 
					book.genre, book.description, 
					book.authors, book.editors, 
					book.reviews
				)
			)
		})
		return bookArray;
}

export const readWriters = () : Writer[] => {
	const anyArray = JSON.parse(fs.readFileSync(usersURI).toString());
	let writerArray : Writer[] = [];
	anyArray
		.filter((user : User) => user.role === 'WRITER')
		.map(({email, password, nationality, booksId, fund, id} : any) => {
			writerArray.push(new Writer(email, password, nationality, fund, 'WRITER', booksId, id))
		})
	return writerArray;
}

export const readReaders = () : Reader[] => {
	const anyArray = JSON.parse(fs.readFileSync(usersURI).toString());
	let readerArray : Reader[] = [];
	anyArray
		.filter((user : User) => user.role === 'READER')
		.map(({email, password, nationality, booksId, orders, fund, id} : any) => {
			readerArray.push(new Reader(email, password, nationality, fund, 'READER', booksId, orders, id,))
		})
	return readerArray;
}

export const getBookById = (iId : string) : Book | undefined => readBooks().find(((book : Book) => book.getId() === iId));

export const getWriterById = (iId : string) : Writer | undefined => readWriters().find(((writer : Writer) => writer.id === iId));

export const getReaderById = (iId : string) : Reader | undefined => readReaders().find(((reader : Reader) => reader.id === iId));