import fs from "fs";
import moment from "moment";
import { v4 } from "uuid";
import { Book } from "./models/Book";
import { Reader } from "./models/Reader";
import { Writer } from "./models/Writer";
import { User } from "./interfaces/User";
import { Order } from "./interfaces/Order";
import { Review } from "./interfaces/Review";

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
	anyArray.map(({ _title, _price, _launchDate, _genre, _description, _author, _editors, _soldCopies, _reviews, _id }: any) => {
		bookArray.push(
			new Book(_title, _price, _launchDate, _genre, _description, _author, _editors, _soldCopies, _reviews, _id)
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
	readBooks().find(({ id }: Book) => id === iId);

export const getWriterById = (iId: string): Writer | undefined =>
	readWriters().find(({ id }: Writer) => id === iId);

export const getReaderById = (iId: string): Reader | undefined =>
	readReaders().find(({ id }: Reader) => id === iId);


export const areSomeBookIUndefined = (inventory: string[]) => inventory.map(bId => getBookById(bId)).some(b => b === undefined);

export const isTooExpensive = (rId: string, inventory: string[]) => inventory.map(bId => getBookById(bId)!.price).reduce((acc: number, curr: number) => acc + curr) < getReaderById(rId)!.fund;

export const haveAlready = (rId: string, inventory: string[]) => inventory.some(bId => getReaderById(rId)!.booksIds.includes(rId));

export const makeOrder = (rId: string, inventory: string[]) => {
	let books = readBooks();
	let readers = readReaders();
	let writers = readWriters();
	let total: number = 0;
	books = books.map(b => {
		if (inventory.includes(b.id)) b.soldCopies++;
		return b;
	})
	writers = inventory.map(bId => {
		const book = getBookById(bId)!;
		const author = getWriterById(book.author)!;
		author.fund += book.price;
		total += book.price;
		return author;
	})
	readers = readReaders().map((r: Reader) => {
		if (r.id === rId) {
			r.fund = r.fund - total;
			r.addBooksIds(inventory);
		}
		return r
	});
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2))
	fs.writeFileSync(readersURI, JSON.stringify(readers, null, 2))
	fs.writeFileSync(writersURI, JSON.stringify(writers, null, 2))
};


export const isBookExists = (bookId: string): boolean => {
	const books = readBooks();
	return books.some(({ id }) => id === bookId)
}


export const isEmailExists = (iEmail: string, role: "READER" | "WRITER") =>
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

export const writeBook = (title: string, price: number, genre: string, description: string, author: string, editors: string[]) => {
	let newBooks = readBooks();
	newBooks.push(new Book(title, price, moment().subtract(10, 'days').calendar(), genre, description, author, editors))
	fs.writeFileSync(booksURI, JSON.stringify(newBooks, null, 2))
}

export const deleteBook = (iId: string): void => {
	let books = readBooks();
	books = books.filter(({ id }: Book) => id !== iId);
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2));
}

export const editBook = (bId: string, title: string, price: number, description: string): void => {
	let books = readBooks();
	books.map((b: Book) => {
		if (b.id === bId) {
			b.title = title
			b.price = price
			b.description = description
		}
	})
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2));
}

export const getBooks = (id: string, role: "READER" | "WRITER") =>
	({
		WRITER: getWriterById(id)!.booksIds,
		READER: getReaderById(id)!.booksIds
	}[role]).map(bId => getBookById(bId)!);


export const writeReviews = (bId: string, title: string, text: string, valutation: 1 | 2 | 3 | 4 | 5): void => {
	const wReview: Review = { id: v4(), title, date: moment().subtract(10, 'days').calendar(), text, valutation }
	let books: Book[] = readBooks();
	books.map((b: Book) => {
		if (b.id === bId) b.addReview(wReview)
	})
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2))
}

export const editReviews = (bId: string, rId: string, title: string, text: string, valutation: 1 | 2 | 3 | 4 | 5) => {
	let books = readBooks();
	books.map((b: Book) => {
		if (b.id === bId) {
			const review = b.reviews.find((r: Review) => r.id === rId)!
			review.title = title,
				review.text = text,
				review.valutation = valutation
		}
	})
	fs.writeFileSync(booksURI, JSON.stringify(books, null, 2))
}

