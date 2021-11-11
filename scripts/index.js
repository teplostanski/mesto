import {Card} from './Card.js';
import { FormValidator, validationConfig } from './FormValidator.js';

export {onClickByImg};

const popups = document.querySelectorAll(".popup");
const popupContainers = document.querySelectorAll(".popup__container");
const popupGalleryContainer = document.querySelector(".popup__gallery");
const popupEditProfile = document.querySelector('#popupEditProfile');
const editButton = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('input[name="name"]');
const descriptionInput = popupEditForm.querySelector('input[name="description"]');
const closeButtons = document.querySelectorAll('.popup__close');
const popupAddCard = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = popupAddCard.querySelector('input[name="place"]');
const placeImgInput = popupAddCard.querySelector('input[name="url"]');
const addCardForm = popupAddCard.querySelector('.popup__form');
const popupGallery = document.getElementById('popupGallery');
const galleryImg = document.querySelector('.popup__img-gallery');
const galleryCapture = document.querySelector('.popup__figcaption');
const templateForCard = document.querySelector('#templateForCard');
const cardsContainer = document.querySelector('.cards');

import {initialCards} from './initial-cards.js'

function openPopup(popup) {
  popup.classList.add('popup_opened');
	document.addEventListener('keydown', onKeydown);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', onKeydown);
}

function onClickEditButton(){
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
	openPopup(popupEditProfile);
}

function formSubmitEditProfileHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
	closePopup(popupEditProfile);
}

for (const card of initialCards) {
  cardsContainer.appendChild(createCard(card));
}

function formSubmitAddCardHandler(evt) {

  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeImg = placeImgInput.value;
  const data = {
    name: placeName,
    link: placeImg,
    alt: placeName
  };
	cardsContainer.prepend(createCard(data));
  closePopup(popupAddCard);
	addCardForm.reset();
}

// Создать карточки
function createCard (card) {
  return (new Card(card,  onClickByImg, '#templateForCard')).createCardNode()
}


// Сбросить поля формы при закрытии
function onClickAddButton() {
  openPopup(popupAddCard);
	addCardForm.reset();
}

function onClickCloseButton(evt) {
  closePopup(evt.target.closest('.popup'));
}

function onClickByImg (evt) {
  const newLink = evt.target.getAttribute('src');
  const newTxt = evt.target.getAttribute('alt');
  galleryImg.setAttribute('src', newLink);
  galleryImg.setAttribute('alt', newTxt);
  galleryCapture.textContent = newTxt;
  openPopup(popupGallery);
}

//закрытие попапов по клавише escape
function onKeydown(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

function onClickPopupContainer(evt) {
  evt.stopPropagation();
}

//закрытие попапа кликом по оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", onClickCloseButton)
});

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener("click", onClickPopupContainer);
});

//валидатор форм
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
cardFormValidator.enableValidation();

popupGalleryContainer.addEventListener("click", onClickPopupContainer);
popupEditForm.addEventListener('submit', formSubmitEditProfileHandler);
editButton.addEventListener('click', onClickEditButton);
addCardForm.addEventListener('submit', formSubmitAddCardHandler);
closeButtons.forEach(button => button.addEventListener('click', onClickCloseButton));
addButton.addEventListener('click', onClickAddButton);