class Api {
	constructor(options) {
		this._options = options;
	}

	_fetch(personalMethod, options) {
			return fetch(this._options.baseUrl + personalMethod, {
					headers: this._options.headers,
					...options
			})
			.then((res) => {
					if(res.ok) {
							return res.json();
					}
					return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	getUserInfo() {
			return this._fetch('/users/me');
	}

	getInitialCards() {
		return this._fetch('/cards');
	}

	updateUserInfo(data) {
			return this._fetch('/users/me', {
					method: 'PATCH',
					body: JSON.stringify(data)
			});
	}

	addNewCard(data) {
			return this._fetch('/cards', {
					method: 'POST',
					body: JSON.stringify(data)
			});

	}
}
export { Api };