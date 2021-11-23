import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
	constructor(popup) {
		super(popup);
		this._imgPopup = this._popupEl.querySelector('.popup__img-gallery');
		this._titlePopup = this._popupEl.querySelector('.popup__figcaption');
	}

	open({src, alt}) {
		super.open();
		this._imgPopup.setAttribute('src', src);
		this._imgPopup.setAttribute('alt', alt);
		this._titlePopup.textContent = alt;
	}
}
export { PopupWithImage };