import { Either, left, right } from "../../../common/helpers/Either";
import luhn from "luhn";
import {
	cipherIvEncryption,
	generateIv,
} from "../../../common/helpers/criptography";
import InvalidCardError from "../../../application/errors/domain/invalid-card-error";
import Env from "../../../main/config";

export default class Card {
	private constructor(
		private readonly _number: string,
		private readonly _cvv: string,
		private readonly _expirationDate: string,
		private readonly _name: string,
		private readonly _iv: string
	) {}
	private static key = Env.get<string>("CARD_ENCRYPTION_KEY");
	private static algorithm = Env.get<string>("CARD_ENCRYPTION_ALGORITHM");

	public static create(
		number: string,
		cvv: string,
		expirationDate: string,
		name: string
	): Either<InvalidCardError, Card> {
		let errorMessages: string[] = [];
		if (!number) {
			errorMessages.push("Card number is required");
		} else if (!this.isValidCardNumber(number)) {
			errorMessages.push("Invalid card number");
		}

		if (!cvv) {
			errorMessages.push("Card cvv is required");
		} else if (!this.isValidCVV(cvv)) {
			errorMessages.push("Invalid card cvv");
		}

		if (!expirationDate) {
			errorMessages.push("Card expiration date is required");
		} else if (!this.isValidExpirationDate(expirationDate)) {
			errorMessages.push("Invalid card expiration date");
		}

		if (!name) {
			errorMessages.push("Card name is required");
		} else if (!this.isValidCardholderName(name)) {
			errorMessages.push("Invalid card name");
		}

		if (errorMessages.length > 0) {
			return left(new InvalidCardError(errorMessages.join()));
		}

		const iv = generateIv();
		number = this.encrypt(number, iv);
		cvv = this.encrypt(cvv, iv);
		expirationDate = this.encrypt(expirationDate, iv);
		name = this.encrypt(name, iv);

		return right(new Card(number, cvv, expirationDate, name, iv));
	}

	public static buildExisting(
		number: string,
		cvv: string,
		expirationDate: string,
		name: string,
		iv: string
	) {
		return new Card(number, cvv, expirationDate, name, iv);
	}

	private static isValidCardNumber(number: string): boolean {
		return luhn.validate(number);
	}

	private static isValidCVV(cvv: string): boolean {
		const cvvRegex = /^[0-9]{3,4}$/;
		return cvvRegex.test(cvv);
	}

	private static isValidCardholderName(name: string): boolean {
		const nameRegex = /^[a-zA-Z\s.'-]+$/;
		return nameRegex.test(name);
	}

	private static isValidExpirationDate(expirationDate: string): boolean {
		//Verify if the expiration date is in the format MM/YYYY or MM/YY
		const expirationDateRegex = /^(0[1-9]|1[0-2])\/(20[0-9]{2}|[0-9]{2})$/;
		if (!expirationDateRegex.test(expirationDate)) {
			return false;
		}

		//Verify if the expiration date is valid
		const currentDate = new Date();
		const [month, year] = expirationDate.split("/");
		const expirationMonth = parseInt(month, 10);
		const expirationYear = parseInt(year, 10) + (year.length === 2 ? 2000 : 0);

		return (
			expirationMonth >= 1 &&
			expirationMonth <= 12 &&
			expirationYear >= currentDate.getFullYear() &&
			!(
				expirationYear === currentDate.getFullYear() &&
				expirationMonth < currentDate.getMonth() + 1
			)
		);
	}

	private static encrypt(plainText: string, iv: string): string {
		return cipherIvEncryption(plainText, this.key, this.algorithm, iv);
	}

	public get number(): string {
		return this._number;
	}

	public get cvv(): string {
		return this._cvv;
	}

	public get expirationDate(): string {
		return this._expirationDate;
	}

	public get name(): string {
		return this._name;
	}

	public get iv(): string {
		return this._iv;
	}
}
