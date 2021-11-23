import './index.css';
import {Card} from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { initialCards } from '../components/initialCards.js'
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { validationConfig } from '../utils/constants.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='description']");
const popupAddCard = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = popupAddCard.querySelector('.popup__form');

function createCard (card) {
  return (new Card(card,  onClickByImg, '.templateForCard')).createCardNode();
}

const cardsSection = new Section ({
  items: initialCards,
  renderer: createCard
}, '.cards');
cardsSection.renderItems();

function newImgCard ({ place, url }) {
  const data = {
    name: place,
    link: url,
    alt: place
  };
  cardsSection.addItem(createCard(data));
  addCardPopup.close();
}

const profileFormValidator = new FormValidator(validationConfig, popupEditForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
cardFormValidator.enableValidation();

const popupGallery = new PopupWithImage('#popupGallery');

function onClickByImg (evt) {
  const newSrc = evt.target.getAttribute('src');
  const newAlt = evt.target.getAttribute('alt');
  popupGallery.open({src: newSrc, alt: newAlt});
}

popupGallery.setEventListeners();

const profilePopup = new PopupWithForm ('#popupEditProfile', formSubmitEditProfileHandler);
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
})

function formSubmitEditProfileHandler ({ name, description }) {
  userInfo.setUserInfo({ name, description });
  profilePopup.close();
}

profilePopup.setEventListeners();


function setPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;
}

function popupProfile() {
  profilePopup.open();
  setPopupProfile();
}

const addCardPopup = new PopupWithForm ('#popupPlace', newImgCard);


function popupForm() {
  addCardPopup.open();
}

addCardPopup.setEventListeners();

editButton.addEventListener('click', popupProfile);
addButton.addEventListener('click', popupForm);