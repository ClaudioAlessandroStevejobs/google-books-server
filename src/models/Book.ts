import { Review } from "../interfaces/Review";
import { v4 } from "uuid";
export class Book {
	constructor(
		private _title: string,
		private _price: number,
		private _launchDate: string,
		private _genre: string,
		private _description: string,
		private _author: string,
		private _editors: string[],
		private _soldCopies: number = 0,
		private _reviews: Review[] = [],
		private _id: string = v4()
	) { }

	get id() { return this._id }

	get title() { return this._title }
	set title(iTitle: string) { this._title = iTitle }

	get price() { return this._price };
	set price(iPrice: number) { this._price = iPrice };

	get description() { return this._description }
	set description(iDescription: string) { this._description = iDescription };

	get genre() { return this._genre }
	set genre(iGenres: string) { this._genre = iGenres }

	get launchDate() { return this._launchDate };

	get soldCopies() { return this._soldCopies };
	set soldCopies(iSoldCopies: number) { this._soldCopies = iSoldCopies };

	get author() { return this._author };


	get editors() { return this._editors }
	addEditors = (iEditor: string) => { this._editors.push(iEditor) };

	get reviews() { return this._reviews };

	addReview = (iReview: Review) => { this._reviews.push(iReview) };
}
