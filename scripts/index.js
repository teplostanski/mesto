const editPopup = document.querySelector('#popupEditProfile');
const editButton = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('input[name="name"]');
const descriptionInput = popupEditForm.querySelector('input[name="description"]');
const closeButtons = document.querySelectorAll('.popup__close');
const addCardPopup = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = addCardPopup.querySelector('input[name="place"]');
const placeImgInput = addCardPopup.querySelector('input[name="url"]');
const addCardForm = addCardPopup.querySelector('.popup__form');
const galleryPopup = document.getElementById('popupGallery');
const galleryImg = document.querySelector('.popup__img-gallery');
const galleryCapture = document.querySelector('.popup__figcaption');
const templateForCard = document.querySelector('#templateForCard');
const cardsContainer = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Птичий мир',
    link: './images/planet-bird-man.jpg',
    alt: 'Птичий мир'
  },

  {
    name: 'Флупилэнд',
    link: './images/flupiland.jpg',
    alt: 'Флупилэнд'
  },

  {
    name: 'Планета с кричащим солнцем',
    link: './images/sun.jpg',
    alt: 'Планета с кричащим солнцем'
  },

  {
    name: 'Планета Сквончи',
    link: './images/sqwonch.jpg',
    alt: 'Планета Сквончи'
  },

  {
    name: 'Постапокалиптическая Земля',
    link: './images/apocalips.jpg',
    alt: 'Постапокалиптическая Земля'
  },

  {
    name: 'Мир Юнити',
    link: './images/unity.jpg',
    alt: 'Мир Юнити'
  },
];

function toggleOpenPopups(popup) {
  popup.classList.add('popup_opened');
}

function toggleClosePopups(popup) {
  popup.classList.remove('popup_opened');
}

function onClickEditButton(){
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
	toggleOpenPopups(editPopup);
}

function formSubmitEditProfileHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
	toggleClosePopups(editPopup);
}

function firstSixCards(parametr_card) {
	const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
	const cardCloneImage = cardClone.querySelector('.card__img');
	cardCloneImage.setAttribute('src', parametr_card.link);
	cardCloneImage.setAttribute('alt', parametr_card.alt);
	cardCloneImage.addEventListener('click', onClickByImg);
	cardClone.querySelector('.card__capture').textContent = parametr_card.name;
	cardClone.querySelector('.card__delete-button').addEventListener('click', (evt) => {
		evt.target.closest('.card').remove();
	});
	cardClone.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });
	cardsContainer.prepend(cardClone);
}
initialCards.forEach(firstSixCards);

function formSubmitAddCardHandler(evt) {
  evt.preventDefault();
  const place = {
    name: placeNameInput.value,
    link: placeImgInput.value,
		alt: placeNameInput.value
  };

  placeNameInput.value = '';
  placeImgInput.value = '';

  firstSixCards(place);
  toggleClosePopups(addCardPopup);
}

function onClickAddButton() {
  toggleOpenPopups(addCardPopup);
}

function onClickCloseButton(evt) {
  toggleClosePopups(evt.target.closest('.popup'));
}

function onClickByImg (evt) {
  const newLink = evt.target.getAttribute('src');
  const newTxt = evt.target.getAttribute('alt');
  galleryImg.setAttribute('src', newLink);
  galleryImg.setAttribute('alt', newTxt);
  galleryCapture.textContent = newTxt;
  toggleOpenPopups(galleryPopup);
}

popupEditForm.addEventListener('submit', formSubmitEditProfileHandler);
editButton.addEventListener('click', onClickEditButton);
addCardForm.addEventListener('submit', formSubmitAddCardHandler);
closeButtons.forEach(button => button.addEventListener('click', onClickCloseButton));
addButton.addEventListener('click', onClickAddButton);