import { Popup } from './Popup.js'
const popupImgView = document.querySelector('#popupGallery');
const imgPopup = popupImgView.querySelector('.popup__img-gallery');
const titlePopup = popupImgView.querySelector('.popup__figcaption');

class PopupWithImage extends Popup{
	constructor(data, popupSelector){
		super(popupSelector)
		this._name = data.name;
		this._link = data.link;
	}

	open() {
		super.open();
		super.setEventListeners();
		this._popupSelector.classList.add('popup_opened')
		imgPopup.src = this._link;
		imgPopup.alt = this._name;
		titlePopup.textContent = this._name;
	}
}
export { PopupWithImage };