import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
	constructor({popupSelector, handleFormSubmit}) {
		super(popupSelector)
		this.handleFormSubmit = handleFormSubmit;
		this._element = popupSelector;
		this._form = this._element.querySelector('.popup__form');
	}

	_getInputValues() {
		this._inputList = this._element.querySelectorAll('.popup__input');
		this._formValues = {};
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});

		return this._formValues;
	}

	_handlInput = (evt) => {
		evt.preventDefault();
		this.handleFormSubmit(evt, this._getInputValues())
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', this._handlInput);
	}

	close() {
		this._form.removeEventListener('submit', this._handlInput);
		this._form.reset();
		super.close();
	}
}
export { PopupWithForm };