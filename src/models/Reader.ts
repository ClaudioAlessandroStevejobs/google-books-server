import { Order } from "../interfaces/Order";
import { Coupon } from "../interfaces/Coupon";
import { v4 } from "uuid";
import moment from "moment";
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


	addBooksIds = (bIds: string[]) => {
		bIds.map(bId => {
			this.booksIds.push(bId);
		})
	}

	addOrder = (order: Order) => { this.orders.push(order) }

	addCoupon = (...coupons: Coupon[]) => {
		coupons.map(coup => {
			this.coupons.push(coup);
		})
	}

	deleteCoupon = (cId: string) => {
		const coupon = this.coupons.find(({ id }: Coupon) => id === cId)!;
		const index = this.coupons.indexOf(coupon)
		this.coupons.splice(index, 1);
	}

	useCoupon = (cId: string, money: number) => {
		const coupon = this.coupons.find(({ id }: Coupon) => id === cId)!;
		if (moment(coupon.deadline, 'MM/DD/YYYY').isBefore(moment())) {
			this.fund -= money;
			this.deleteCoupon(cId);
			return;
		}
		if (coupon.money < money) {
			this.fund = this.fund - money + coupon.money;
			this.deleteCoupon(cId);
		} else if (coupon.money === money) this.deleteCoupon(cId);
		else coupon.money -= money
	}
}
