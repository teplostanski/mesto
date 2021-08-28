const formUser = document.forms.profile;
const formAddCard = document.forms.addCard;

//валидация приброшенного инпута
function isFieldValid(input) {

	input.setCustomValidity("");

	/*
	if (input.validity.valueMissing) {
		//кастомная ошибка
		//input.setCustomValidity("Поле обязательное"); //setCustomValidity(message): Позволяет добавить в элемент кастомное сообщение об ошибке; при этом элемент будет считаться не валидным и отобразится указанная ошибка. Это позволяет использовать JavaScript-код, чтобы представить ошибку валидации иначе, чем это предусмотрено стандартными средствами валидации HTML5. При сообщении об ошибке данное кастомное сообщение показывается пользователю.


		//браузерная ошибка
		input.validationMessage;

		//возвращает отричательное значение
		return false;
	}
	*/

	//без костылей возвращает ошибку из браузерного api
	return input.checkValidity(); //checkValidity(): Возвращает true, если значение элемента проходит валидацию, иначе возвращает false. Если элемент не валиден, данный метод также запускает на нём событие invalid.
}

//проверка на валидность
function validateField(input) {
	//функция выбирает спан где отображается костомная ошибка
	const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
	//смотрит валидное поле или нет
	isFieldValid(input);

	errorElement.innerText = input.validationMessage;
}

//включение / выключение кнопки
function setSubmitButtonState(button, state) {}

//валидация инпута
function handlerInputForm(event) {
	const form = event.currentTarget;
	const input = event.target;

	validateField(input);
}

//отправка формы
function sendForm(event) {}

formAddCard.addEventListener('submit', sendForm);
formAddCard.addEventListener('input', handlerInputForm, true);

formUser.addEventListener('submit', sendForm);
formUser.addEventListener('input', handlerInputForm, true);