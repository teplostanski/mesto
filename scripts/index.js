//определяю сам попап
const editPopup = document.querySelector('.popup');

//определяю кнопку редактирования профиля(значок карандаш)
const editButton = document.querySelector('.profile__edit-button');

//определяю имя пользователя в ПРОФИЛЕ(нужно это для того чтобы связать с input в form в ПОПАПЕ)
const nameProfile = document.querySelector('.profile__name');

//определяю описание пользователя в ПРОФИЛЕ
const descriptionProfile = document.querySelector('.profile__description');

//отпределяю форму для ввода текста в ОТКРЫТОМ ПОПАПЕ
const popupForm = document.querySelector('.popup__form');

//определяю строчку для ввода имени и описания пользователя в  ОТКРЫТОМ ПОПАПЕ
const nameInput = popupForm.querySelector('input[name="name"]');
const descriptionInput = popupForm.querySelector('input[name="description"]');

//определяю стили для закрытия попапа
const closeButton = document.querySelector('.popup__close');

/*
//Открыть ПопАп
function onClickEditButton(){
  //.popup + .popup_opened
  editPopup.classList.add('popup_opened');
  //ввод имени input[name="name"] и input[name="description"] 
  //со значением VALUE(значение текстовых полей) присваивается 
  //.profile__name со свойством textContent(управляет тестовым содежимым, позволяет 
  //получить и перезаписать текстовое содержимое элемента не трогая разметку)
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

//Закрыть ПопАп
function onClickCloseButton(){
  //.popup - .popup_opened
  editPopup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', onClickCloseButton);
*/

//попап редактирования профиля
//эксперимент открытия и закрытия попапа методом toggle(код стал короче на 4 строчки потому что не надо писать функцию для закрытия попапа,следовательно обработчики событий для закрытия и открытия попапа обращаются в одной и той же функции)
//Открыть ПопАп
function onClickEditButton(){
  //.popup + .popup_opened
  editPopup.classList.toggle('popup_opened');
  //ввод имени input[name="name"] и input[name="description"] 
  //со значением VALUE(значение текстовых полей) присваивается 
  //.profile__name со свойством textContent(управляет тестовым содежимым, позволяет 
  //получить и перезаписать текстовое содержимое элемента не трогая разметку)
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}


//Добавить данные в профиль
//вешаю событие отправки формы submit
function formSubmitHandler (evt) {
  //отменяю стандартную функцию перезагрузки страницы при успешной отправки формы
  evt.preventDefault();

  //получение новых текстовых значение
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  //полученные текстовые данные сохраняются в переменные
  //закрытие попапа по нажатию кнопки "сохранить"
  onClickCloseButton();
}


//обработчики событий

//отправка формы
popupForm.addEventListener('submit', formSubmitHandler);
//клик по кнопке "редактирование профиля"(карандаш)
editButton.addEventListener('click', onClickEditButton);
//клик по кнопке "закрыть"
closeButton.addEventListener('click', onClickEditButton);