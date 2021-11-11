//объект настроек с селекторами и классами элементов, используемых при валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active'
};

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
		const inputList = this._formElement.querySelectorAll(this._inputSelector);
		const submitButton = this._formElement.querySelector(this._submitButtonSelector);
		const isFormValid = this._formElement.checkValidity();
		this._toggleSubmitButton(submitButton, isFormValid);
		Array.from(inputList).forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				const isFormValid = this._formElement.checkValidity();
				this._isValid(inputElement);
				this._toggleSubmitButton(submitButton, isFormValid);
			});
		});
		this._formElement.addEventListener('reset', () => {
			this._toggleSubmitButton(submitButton, isFormValid);
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
	_toggleSubmitButton(submitButton, isActive) {
		if (isActive) {
			submitButton.classList.remove(this._inactiveButtonClass);
			submitButton.removeAttribute('disabled');
		} else {
			submitButton.classList.add(this._inactiveButtonClass);
			submitButton.setAttribute('disabled', 'true');
		}
	};
}

export { FormValidator, validationConfig };