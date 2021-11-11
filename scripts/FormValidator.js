//import { validationConfig } from './index.js'

class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  }

	//функция проверки полей формы
	_hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return inputElement.validity.valid === false;
    });
  }

	//функция отображения ошибки
	_showError(inputElement, errorElement) {
		inputElement.classList.add(this._inputErrorClass);
		errorElement.classList.add(this._errorClass);
		errorElement.textContent = inputElement.validationMessage;
	}

	//функция скрытия ошибки
	_hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

	//функция проверки валидности
	_isValid(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showError(inputElement, error);
    } else {
      this._hideError(inputElement, error);
    }
  }

	//функция прослушки ввода и изменения состояния кнопки при вводе
	_setEventListeners() {
		//const _inputList = this._formElement.querySelectorAll(this._inputSelector);
		//const submitButton = this._formElement.querySelector(this._submitButtonSelector);
		const isFormValid = this._formElement.checkValidity();
		this._toggleSubmitButton(this._submitButton, isFormValid);
		Array.from(this._inputList).forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				const isFormValid = this._formElement.checkValidity();
				this._isValid(inputElement);
				this._toggleSubmitButton(this._submitButton, isFormValid);
			});
		});
		this._formElement.addEventListener('reset', () => {
			this._toggleSubmitButton(this._submitButton, false);
		});
		};


	//функция валидации форм
	enableValidation() {
		this._formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		this._setEventListeners();
	}

	//функция изменения состояния кнопки
	_toggleSubmitButton(_submitButton, isActive) {
		if (isActive) {
			this._submitButton.classList.remove(this._inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
		} else {
			this._submitButton.classList.add(this._inactiveButtonClass);
			this._submitButton.setAttribute('disabled', 'true');
		}
	};
}

export { FormValidator };