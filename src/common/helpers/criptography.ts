import crypto, { randomBytes } from "crypto";

const generateIv = (): string => {
	return randomBytes(16).toString("hex").slice(0, 16);
};

const cipherIvEncryption = (
	value: string,
	key: string,
	algorithm: string,
	iv: string
): string => {
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(value, "utf8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
};

export { cipherIvEncryption, generateIv };
