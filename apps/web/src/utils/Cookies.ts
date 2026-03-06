export default class Cookies {
	static set(name: string, value: string, expirationDate?: Date) {
		const expires = expirationDate ? '; expires=' + expirationDate.toUTCString() : '';
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	}
	static get<T>(key: string): T | null {
		const nameEQ = key + '=';
		const cookieData = document.cookie.split(';');
		for (let i = 0; i < cookieData.length; i++) {
			let cookie = cookieData[i];
			while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
			if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length) as T;
		}
		return null;
	}
	delete(key: string) {
		document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1900 00:00:01 GMT;';
	}
}
