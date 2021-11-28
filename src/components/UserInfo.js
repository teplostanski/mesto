class UserInfo {
	constructor ( {nameSelector, descriptionSelector, avatarSelector} ) {
		this.name = document.querySelector(nameSelector);
		this.description = document.querySelector(descriptionSelector);
		this.avatar = document.querySelector(avatarSelector);
	}

	//getUserInfo() {
	//	return {
	//		name: this.name.textContent,
	//		description: this.description.textContent
	//	};
	//}

	//setUserInfo({ name, description, avatar }) {
	//	this.name.textContent = name;
	//	this.description.textContent = description;
	//	this.setUserAvatar(avatar);
	//}
	render() {
		this.name.textContent = this._userInfo.name;
		this.description.textContent = this._userInfo.description;
		this.avatar.setAttribute('src', this._userInfo.avatar);
	}

	setUserAvatar (avatar) {
		this._userInfo.avatar = avatar;
	}

	getUserInfo() {
		return this._userInfo;
	}

	setUserInfo(userInfo) {
		this._userInfo = userInfo;
	}
}
export { UserInfo };