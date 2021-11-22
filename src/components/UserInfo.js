const formProfileElement = document.querySelector('.popup__form');
const nameInput = formProfileElement.querySelector('.popup__input_name');
const jobInput = formProfileElement.querySelector('.popup__input_description');

class UserInfo {
	constructor({username, description}){
		this._username = username;
		this._description = description;
	}

	getUserInfo() {
		nameInput.value = this._username.textContent;
		jobInput.value =  this._description.textContent;
	}

	setUserInfo() {
		this._username.textContent = nameInput.value;
		this._description.textContent = jobInput.value;
	}
}
export { UserInfo };