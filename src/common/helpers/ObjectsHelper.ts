import { isCPF } from "brazilian-values";

const isCpf = (value: string): boolean => {
	return isCPF(value);
};

const isEmail = (value: string) => {
	return String(value)
		.toLowerCase()
		.match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/);
};

const objectKeyExists = <T extends Record<string, any>, R extends keyof T>(
	object: T,
	key: R
): object is T & Required<Pick<T, R>> => {
	if (typeof object !== "object" || !object) return false;
	return key in object;
};

export { isCpf, isEmail, objectKeyExists };
