class Popup {
	constructor(popupSelector){
		this._popupSelector = popupSelector;
		this._listenerClick = this._handleEscClose.bind(this);
	}

	setEventListeners() {
		document.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup_opened')
			||
			evt.target.classList.contains('popup__close')
			 ) {
					this.close();
			}
		});
	}

	open() {
		this._popupSelector.classList.add('popup_opened');
		document.addEventListener('keydown', this._listenerClick);
		this.setEventListeners();
	}

	close() {
		this._popupSelector.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._listenerClick);
		this.setEventListeners();
	}

	_handleEscClose (evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}
export { Popup };