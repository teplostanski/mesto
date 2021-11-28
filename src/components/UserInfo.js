class UserInfo {
	constructor ( {nameSelector, aboutSelector, avatarSelector} ) {
		this.name = document.querySelector(nameSelector);
		this.about = document.querySelector(aboutSelector);
		this.avatar = document.querySelector(avatarSelector);
	}

	render() {
		this.name.textContent = this._userInfo.name;
		this.about.textContent = this._userInfo.about;
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