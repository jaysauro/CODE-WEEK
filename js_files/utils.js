export const qs = (type) => document.querySelector(type);

export const ce = (type) => document.createElement(type);

export const GET = async (BASE_URL) =>
  await fetch(BASE_URL)
    .then((res) => res.json())
    .then((res) => res);

export const DELETE = async (BASE_URL, id) => {
	return await fetch (`${BASE_URL}/${id}`, {
		method: 'DELETE'
	})
}

export const POST = async (BASE_URL, body) => {
	return await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
}



