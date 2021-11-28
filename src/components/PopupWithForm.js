import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
	constructor(popupSelector,  handleFormSubmit) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._inputs = this._popupEl.querySelectorAll('.popup__input');
		this._form = this._popupEl.querySelector('.popup__form');
		this._submit = this._form.querySelector('.popup__button');
    this._submitText = this._submit.textContent;
	}

	_getInputValues() {
		const formInput = {};
		this._inputs.forEach((input) => {
			formInput[input.name] = input.value
		});

		return formInput;
	}

	enableSubmit() {
		this._submit.removeAttribute('disabled');
		this._submit.textContent = this._submitText;
	}

	disableSubmit() {
		this._submit.setAttribute('disabled', 'disabled');
		this._submit.textContent = 'Сохранение...';
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			this._handleFormSubmit(this._getInputValues());
			evt.preventDefault();
		});
	}

	close() {
		super.close();
		this._form.reset();
	}
}
export { PopupWithForm };