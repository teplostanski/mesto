import './index.css';
import {Card} from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { initialCards } from '../components/initialCards.js'
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { validationConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js'

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='description']");
const popupAddCard = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = popupAddCard.querySelector('.popup__form');

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
	headers: {
		authorization: '824c1506-61a7-48e4-8b2f-cd5fe1a7a429',
		'Content-Type': 'application/json'
	}
});

function createCard (card) {
  return (new Card(card,  onClickByImg, '.templateForCard')).createCardNode();
}

api.getInitialCards()
.then((data) => {
  const cardsSection = new Section ({
    items: data,
    renderer: createCard
  }, '.cards');

  cardsSection.renderAll();
})

function newImgCard ({ place, url }) {
  const data = {
    name: place,
    link: url,
  };
  api.addNewCard(data)
    .then((card) => {
      const cardsSection = new Section ({}, '.cards');
      cardsSection.addItem(createCard(card));
      addCardPopup.close();
    })
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
  descriptionSelector: '.profile__description',
	avatarSelector: '.profile__avatar'
})

function formSubmitEditProfileHandler ({ name, description }) {
  userInfo.setUserInfo({
    name,
    description,
    avatar: userInfo.getUserInfo().avatar
  });
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

api.getUserInfo()
.then((data) => {
  userInfo.setUserInfo(data);
})

addCardPopup.setEventListeners();

editButton.addEventListener('click', popupProfile);
addButton.addEventListener('click', popupForm);