import {Card} from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { Section } from './Section.js';
import {initialCards} from './initial-cards.js'
import { UserInfo } from './UserInfo.js';
import { PopupWithForm } from './PopupWithForm.js';

const popupEditProfile = document.querySelector('#popupEditProfile');
const editButton = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const popupEditForm = document.querySelector('.popup__form');
const popupAddCard = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = popupAddCard.querySelector('input[name="place"]');
const placeImgInput = popupAddCard.querySelector('input[name="url"]');
const addCardForm = popupAddCard.querySelector('.popup__form');
const popupGallery = document.getElementById('popupGallery');
const cardsContainer = document.querySelector('.cards');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active'
};

function createCard (item) {
  const card = new Card({
    data: item,
    onClickByImg: (evt) => {
      const popupImg = new PopupWithImage(item, popupGallery);
      popupImg.open(evt);
    }
  },
  '.templateForCard'
  );
  const cardElement = card.createCardNode();
  return cardElement;
}

const newImgCard = () => {
  const addNewCard = {
    name: placeNameInput.value,
    link: placeImgInput.value
  }
  const newCard = createCard(addNewCard);
  cardsContainer.prepend(newCard);
  formCard.close();
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const element = createCard(item);
    defaultCardList.addItem(element);
    }
  },
  cardsContainer
);
defaultCardList.renderItems();

const userForm = new UserInfo({username: nameProfile, description: descriptionProfile});

const formProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (evt) => {
    newProfile(evt);
  }
});

const formCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (evt) => {
    newImgCard(evt);
  }
});

const popupForm = () => {
  formCard.open();
}

const popupProfile = () => {
  userForm.getUserInfo();
  formProfile.open();
}

const newProfile = () => {
  userForm.setUserInfo();
  formProfile.close();
}

const profileFormValidator = new FormValidator(validationConfig, popupEditForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
cardFormValidator.enableValidation();

editButton.addEventListener('click', popupProfile);
addButton.addEventListener('click', popupForm);