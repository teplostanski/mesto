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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

// я не понимаю зачем нужны два атрибута title, imageLink, с моим кодом два атрибута работать не хотят и я не знаю как это исправить
function createCard(title) {
	const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
	const cardCloneImage = cardClone.querySelector('.card__img');
	cardCloneImage.setAttribute('src', title.link);
	cardCloneImage.setAttribute('alt', title.alt);

	cardCloneImage.addEventListener('click', onClickByImg);

	cardClone.querySelector('.card__capture').textContent = title.name;

	cardClone.querySelector('.card__like-button').addEventListener('click', (evt) => {
		evt.target.classList.toggle('card__like-button_active');
	});

	cardClone.querySelector('.card__delete-button').addEventListener('click', (evt) => {
		evt.target.closest('.card').remove();
	});


	return cardClone;
}

for (const card of initialCards) {
	cardsContainer.append(createCard(card));
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

function onClickAddButton() {
  openPopup(popupAddCard);
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

popupEditForm.addEventListener('submit', formSubmitEditProfileHandler);
editButton.addEventListener('click', onClickEditButton);
addCardForm.addEventListener('submit', formSubmitAddCardHandler);
closeButtons.forEach(button => button.addEventListener('click', onClickCloseButton));
addButton.addEventListener('click', onClickAddButton);
