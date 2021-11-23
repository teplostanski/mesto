class UserInfo {
	constructor ( {nameSelector, descriptionSelector} ) {
		this.name = document.querySelector(nameSelector);
		this.description = document.querySelector(descriptionSelector);
	}

	getUserInfo() {
		return {
			name: this.name.textContent,
			description: this.description.textContent
		};
	}

	setUserInfo({ name, description }) {
		this.name.textContent = name;
		this.description.textContent = description;
	}
}
export { UserInfo };