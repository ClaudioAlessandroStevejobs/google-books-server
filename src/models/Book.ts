import { Review } from "../interfaces/Review";
import { v4 } from "uuid";
export class Book {
  constructor(
    private title: string,
    private price: number = 0,
    private launchDate: string,
    private genre: string,
    private description: string,
    private authors: string[],
    private editors: string[],
    private reviews: Review[],
    private id: string = v4()
  ) {}

  getTitle = () => this.title;
  getPrice = () => this.price;
  getLaunchDate = () => this.launchDate;
  getGenre = () => this.genre;
  getDescription = () => this.description;
  getAuthors = () => this.authors;
  getEditors = () => this.editors;
  getReviews = () => this.reviews;
  getId = () => this.id;
  setTitle = (title: string) => (this.title = title);
  setPrice = (price: number) => (this.price = price);
  setDescription = (description: string) => (this.description = description);
}
