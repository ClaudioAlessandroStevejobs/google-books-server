import { Order } from "../interfaces/Order";
import { Coupon } from "../interfaces/Coupon";
import { v4 } from "uuid";
export class Reader {
	constructor(
		private _email: string,
		private _password: string,
		private _nationality: string,
		private _fund: number = 0,
		private _booksIds: string[] = [],
		private _orders: Order[] = [],
		private _coupons: Coupon[] = [],
		private _id: string = v4(),
		private _token?: string
	) { }


	get email(): string { return this._email };
	set email(iEmail) { this._email = iEmail };

	get password(): string { return this._password };
	set password(iPass) { this._password = iPass };

	get nationality(): string { return this._nationality };
	set nationality(iNationality) { this._nationality = iNationality };

	get fund(): number { return this._fund };
	set fund(iFund) { this._fund = iFund };

	get booksIds(): string[] { return this._booksIds };

	get orders(): Order[] { return this._orders };

	get coupons(): Coupon[] { return this._coupons };

	get id(): string { return this._id };

	get token(): string | undefined { return this._token };
	set token(iToken) { this._token = iToken };


	addBooksIds = (...bIds: string[]) => {
		bIds.map(bId => {
			this.booksIds.push(bId);
		})
	}

	addOrder = (order: Order) => { this.orders.push(order) }

	addCoupons = (...coupons: Coupon[]) => {
		coupons.map(coup => {
			this.coupons.push(coup);
		})
	}
}
