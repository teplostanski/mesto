import './index.css';
import {Card} from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { validationConfig } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

const editButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector("input[name='name']");
const descriptionInput = popupEditForm.querySelector("input[name='about']");
const popupAddCard = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = popupAddCard.querySelector('.popup__form');
const changeAvatarButton = document.querySelector('.profile__img-wrapper');

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
	headers: {
		authorization: '824c1506-61a7-48e4-8b2f-cd5fe1a7a429',
		'Content-Type': 'application/json'
	}
});

function createCard (card) {
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

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    userInfo.render();
    cardsSection.renderItems(cards);
  })
  .catch(handleError);

function createNewCard ({ place, url }) {
  const data = {
    name: place,
    link: url,
  };
	addCardPopup.disableSubmit();
  api.addNewCard(data)
    .then((card) => {
      cardsSection.addItem(createCard(card));
      addCardPopup.close();
    })
		.catch(handleError)
    .finally(()=> {
      addCardPopup.enableSubmit();
    })
}

const profileFormValidator = new FormValidator(validationConfig, "form[name = 'profile']");
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, "form[name = 'addCard']");
cardFormValidator.enableValidation();

const changeAvatarFormValidator = new FormValidator(validationConfig, "form[name = 'changeAvatar']");
changeAvatarFormValidator.enableValidation();

const popupGallery = new PopupWithImage('#popupGallery');
popupGallery.setEventListeners();

const profilePopup = new PopupWithForm ('#popupEditProfile', formSubmitEditProfileHandler);
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
})

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
	profileFormValidator.setInitialFormState();
}

function popupProfile() {
  profilePopup.open();
  setPopupProfile();
}

const addCardPopup = new PopupWithForm ('#popupPlace', createNewCard);


function popupForm() {
  addCardPopup.open();
	cardFormValidator.setInitialFormState();
}

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

const changeAvatarPopup = new PopupWithForm('#popupChangeAvatar', formSubmitChangeAvatarHandler);
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
	changeAvatarFormValidator.setInitialFormState();
}

function handleError(err) {
  console.log(err);
}

addCardPopup.setEventListeners();

editButton.addEventListener('click', popupProfile);
addButton.addEventListener('click', popupForm);
changeAvatarButton.addEventListener('click', onClickChangeAvatarButton);