import { isCPF } from "brazilian-values";

const isCpf = (value: string): boolean => {
	return isCPF(value);
};

const isEmail = (value: string) => {
	return String(value)
		.toLowerCase()
		.match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/);
};

export { isCpf, isEmail };
