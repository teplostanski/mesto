//функция отображения ошибки
function showInputError(formElement, inputElement, errorMessage, elem) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(elem.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elem.errorClass);
}

//функция скрытия ошибки
function hideInputError(formElement, inputElement, elem) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(elem.inputErrorClass);
  errorElement.classList.remove(elem.errorClass);
  errorElement.textContent = '';
}

//функция проверки валидности
function checkInputValidity(formElement, inputElement, elem) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, elem);
  } else {
    hideInputError(formElement, inputElement, elem);
  }
}

//функция прослушки ввода и изменения состояния кнопки при вводе
function setEventListeners(formElement, elem) {
  const inputList = Array.from(formElement.querySelectorAll(elem.inputSelector)); //inputList — массив из всех элементов с классом popup__input
  const submitButton = formElement.querySelector(elem.submitButtonSelector);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement, elem);
		toggleSubmitButton(inputList, submitButton, elem);
    });
  });
	formElement.addEventListener('reset', () => {
		inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, elem)
		})
		toggleSubmitButton(inputList, submitButton, elem);
	})
}


//функция валидации форм
function enableValidation (elem) {
  const formList = Array.from(document.querySelectorAll(elem.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, elem);
  });
};

//вызов функции валидации форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active'
});

//функция проверки полей формы
function isInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//функция изменения состояния кнопки
function toggleSubmitButton(inputList, submitButton, elem) {
  if (InvalidInput(inputList)) {
    submitButton.classList.add(elem.inactiveButtonClass);
		submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(elem.inactiveButtonClass);
  	submitButton.removeAttribute('disabled');
  }
}


