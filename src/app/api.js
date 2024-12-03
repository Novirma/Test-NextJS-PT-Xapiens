import axios from "axios";

const webService = "https://reqres.in/";

export function ApiGetUsers(params) {
	try {
		const res = axios({
			method: "GET",
			url: webService + `api/users?page=${params}`,
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