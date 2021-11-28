class UserInfo {
	constructor ( {nameSelector, descriptionSelector, avatarSelector} ) {
		this.name = document.querySelector(nameSelector);
		this.description = document.querySelector(descriptionSelector);
		this.avatar = document.querySelector(avatarSelector);
	}

	getUserInfo() {
		return {
			name: this.name.textContent,
			description: this.description.textContent
		};
	}

	setUserInfo({ name, description, avatar }) {
		this.name.textContent = name;
		this.description.textContent = description;
		this.avatar.setAttribute('src', avatar);
	}
}
export { UserInfo };