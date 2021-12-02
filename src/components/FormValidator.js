class FormValidator {
	constructor(validationConfig, formSelector) {
    this._form = document.querySelector(formSelector);
    this._validationConfig = validationConfig;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
  }

	//функция проверки полей формы
	_hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

	//функция отображения ошибки
_showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig .inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig .errorClass);
  };

	//функция скрытия ошибки
	_hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig .inputErrorClass);
    errorElement.classList.remove(this._validationConfig .errorClass);
    errorElement.textContent = '';
  };

	//функция проверки валидности
	_isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

	//функция прослушки ввода и изменения состояния кнопки при вводе
	_setEventListeners() {
    this._toggleSubmitButton();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleSubmitButton();
      });
    });
    this._form.addEventListener('reset', () => {
      this._disableButton();
    })
  };

	//функция валидации форм
	enableValidation() {
		this._formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		this._setEventListeners();
	}

	//функция изменения состояния кнопки
	_toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

	_disableButton() {
    this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _enableButton() {
    this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  setInitialFormState() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    })
    this._toggleSubmitButton();
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}

export { FormValidator };