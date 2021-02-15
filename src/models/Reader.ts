import { Order } from "../interfaces/Order";
import { Coupon } from "../interfaces/Coupon";

import { v4 } from "uuid";
export class Reader {
	constructor(
		private email: string,
		private password: string,
		private nationality: string,
		private fund: number,
		private booksIds: string[],
		private orders: Order[],
		private coupons: Coupon[],
		private id: string = v4(),
		private token? : string
	) {}
	
	getEmail = () => this.email;
	getPassword = () => this.password;
	getNationality = () => this.nationality;
	getFund = () => this.fund;
	setFund = (fund: number) => { this.fund = fund }
	getBooksIds = () => this.booksIds;
	addBooksIds = (...bIds: string[]) => { 
		bIds.map(bId => {
			this.booksIds.push(bId);
		}) 
	}
	getOrders = () => this.orders;
	addOrder = (order: Order) => { this.orders.push(order) }
	getCoupons = () => this.coupons;
	addCoupons = (...coupons : Coupon[]) => {
		coupons.map(coup => {
			this.coupons.push(coup);
		})
	}
	getToken = () => this.token;
	setToken = (token : string) => this.token = token;
	getId = () => this.id;
}
