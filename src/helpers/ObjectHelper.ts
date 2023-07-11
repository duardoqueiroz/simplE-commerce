import lodash from "lodash";

export default class ObjectHelper {
	public static removeEmptyAttributes<T>(obj: lodash.Dictionary<any>): T {
		const result = lodash.omitBy(obj, (value: any) => {
			if (typeof value === "object" && value !== null) {
				return lodash.isEmpty(this.removeEmptyAttributes(value));
			}
			if (Array.isArray(value)) {
				return lodash.isEmpty(value);
			}
			return value === null || value === undefined || value === "";
		});

		return result as unknown as T;
	}
}
