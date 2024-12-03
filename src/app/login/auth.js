import axios from "axios";

const webService = "https://reqres.in/";

export function ApiLogin(params) {
	try {
		const res = axios({
			method: "POST",
			url: webService + "api/login",
			data: params,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res;
	} catch (e) {
		throw e;
	}
}