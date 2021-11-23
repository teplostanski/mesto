class Popup {
	constructor(popup){
		this._popup = popup;
		this._popupEl = document.querySelector(popup);
		this._listenerClick = this._handleEscClose.bind(this);
	}

	setEventListeners() {
		this._popupEl.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup_opened')
			||
			evt.target.classList.contains('popup__close')
			 ) {
				this.close();
			}
		});
	}

	open() {
		this._popupEl.classList.add('popup_opened');
		document.addEventListener('keydown', this._listenerClick);
	}

	close() {
		this._popupEl.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._listenerClick);
	}

	_handleEscClose (evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}
export { Popup };