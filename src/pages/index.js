import './index.css';
import {Card} from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { initialCards } from '../components/initialCards.js'
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { validationConfig } from '../utils/constants.js';
//import { Api } from '../components/Api.js';
import api from "../components/Api.js"
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='about']");
const popupAddCard = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = popupAddCard.querySelector('.popup__form');
const changeAvatarButton = document.querySelector('.profile__img-wrapper');

//const api = new Api({
//	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
//	headers: {
//		authorization: '824c1506-61a7-48e4-8b2f-cd5fe1a7a429',
//		'Content-Type': 'application/json'
//	}
//});

function createCard (card) {
  //return (new Card(card,  onClickByImg, '.templateForCard', userInfo.getUserId())).createCardNode();
	//return (new Card(card,
	//	onClickByImg,
	//	'.templateForCard',
	//	userInfo.getUserId(),
	//	onDeleteCard
	//	)).createCardNode();
	const userId = userInfo.getUserInfo()._id;
	return new Card(
    card,
    '.templateForCard',
    userId,
    {
      handleCardClick: (evt) => {
        const newSrc = evt.target.getAttribute('src');
        const newAlt = evt.target.getAttribute('alt');
        popupGallery.open({src: newSrc, alt: newAlt});
      },
      handleCardDelete: (cardId, deleteCard) => {
        deleteConfirmatonPopup.open(cardId, deleteCard);
      },
      handleCardLike: (cardId, renderLike, isCardLiked) => {
        if (isCardLiked) {
          api.deleteLike(cardId)
            .then((data) => {
              renderLike(data);
            })
						.catch(handleError)
        } else {
          api.setLike(cardId)
            .then((data) => {
              renderLike(data);
            })
						.catch(handleError)
        }
      }
    }
  ).createCardNode();
}

const cardsSection = new Section ({
  items: [],
  renderer: createCard
}, '.cards');


//api.getInitialCards()
//.then((data) => {
//Promise.all([api.getInitialCards(), api.getUserInfo()])
//  .then(([cards, user]) => {
//	userInfo.setUserInfo(user);
//	userInfo.render();
//  cardsSection.renderItems(cards);
//	})
//	.catch(handleError);
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    userInfo.render();
    cardsSection.renderItems(cards);
  })
  .catch(handleError);



function newImgCard ({ place, url }) {
  const data = {
    name: place,
    link: url,
  };
	addCardPopup.disableSubmit();
  api.addNewCard(data)
    .then((card) => {
      //const cardsSection = new Section ({}, '.cards');
      cardsSection.addItem(createCard(card));
      addCardPopup.close();
    })
		.catch(handleError)
    .finally(()=> {
      addCardPopup.enableSubmit();
    })
}

const profileFormValidator = new FormValidator(validationConfig, popupEditForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
cardFormValidator.enableValidation();


const popupGallery = new PopupWithImage('#popupGallery');
popupGallery.setEventListeners();

const profilePopup = new PopupWithForm ('#popupEditProfile', formSubmitEditProfileHandler);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
})

//function formSubmitEditProfileHandler ({ name, description }) {
//  userInfo.setUserInfo({
//    name,
//    description,
//    avatar: userInfo.getUserInfo().avatar
//  });
//  profilePopup.close();
//}

function formSubmitEditProfileHandler (data) {
	profilePopup.disableSubmit();
  api.updateUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
			userInfo.render();
      profilePopup.close();
    })
		.catch(handleError)
    .finally(()=> {
      profilePopup.enableSubmit();
    })
}

profilePopup.setEventListeners();


function setPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.about;
	//profileFormValidator.setInitialFormState();
}

function popupProfile() {
  profilePopup.open();
  setPopupProfile();
}

const addCardPopup = new PopupWithForm ('#popupPlace', newImgCard);


function popupForm() {
  addCardPopup.open();
}

//api.getUserInfo()
//.then((data) => {
//  userInfo.setUserInfo(data);
//})

const deleteConfirmatonPopup = new PopupWithConfirmation ('#popupConfirmation', formSubmitDeleteConfirmationHandler);
deleteConfirmatonPopup.setEventListeners();

function formSubmitDeleteConfirmationHandler(cardId, deleteCard) {
	deleteConfirmatonPopup.disableSubmit();
  api.deleteCard(cardId)
    .then(() => {
      deleteCard();
      deleteConfirmatonPopup.close();
    })
		.catch(handleError)
    .finally(()=> {
      deleteConfirmatonPopup.enableSubmit();
    })
}

const changeAvatarPopup = new PopupWithForm('#popupChangAvatar', formSubmitChangeAvatarHandler);
changeAvatarPopup.setEventListeners();

function formSubmitChangeAvatarHandler(data) {
	changeAvatarPopup.disableSubmit();
  api.changeAvatar(data)
    .then(() => {
      userInfo.setUserAvatar(data.avatar);
			userInfo.render();
      changeAvatarPopup.close();
    })
		.catch(handleError)
    .finally(()=> {
      changeAvatarPopup.enableSubmit();
    })
}

function onClickChangeAvatarButton() {
  changeAvatarPopup.open();
}

function handleError(err) {
  console.log(err);
}
////Function for opening popup
//function onDeleteCard(cardId, deleteCard) {
//  deleteConfirmatonPopup.open(cardId, deleteCard);
//}

addCardPopup.setEventListeners();

editButton.addEventListener('click', popupProfile);
addButton.addEventListener('click', popupForm);
changeAvatarButton.addEventListener('click', onClickChangeAvatarButton);