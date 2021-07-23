let editButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');
let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('input[name="name"]');
let descriptionInput = popupForm.querySelector('input[name="description"]');
let closeButton = document.querySelector('.popup__close');

//Открыть ПопАп
function onClickEditButton(){
  editPopup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

//Закрыть ПопАп
function onClickCloseButton(){
  editPopup.classList.remove('popup_opened');
}

//Добавить данные в профиль
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  onClickCloseButton();
}

popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', onClickEditButton);
closeButton.addEventListener('click', onClickCloseButton);