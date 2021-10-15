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

function createCard(title) {
	const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
	const cardCloneImage = cardClone.querySelector('.card__img');
	cardCloneImage.setAttribute('src', title.link);
	cardCloneImage.setAttribute('alt', title.alt);
	cardCloneImage.addEventListener('click', onClickByImg);
	cardClone.querySelector('.card__capture').textContent = title.name;
	cardClone.querySelector('.card__delete-button').addEventListener('click', (evt) => {
		evt.target.closest('.card').remove();
	});

	//Искренне не понимаю зачем обработчик лайков нужно тоже навешивать при создании карточки
	//И я также искренне буду признателен если Вы будете объяснять ЗАЧЕМ именно нужно вносить
	//то или иное исправление , а не просто: "Это нужно исправить потому что - потому что"
	//я не спорю, я новичок и уверен что у Вас опыта куда больше чем у меня , но я не понимаю зачем.
	//Может быть это исправление нужно чтобы улучшить функциональность? Нет
	//Может быть это исправление нужно для будушего масштабирования? Нет
	//Это просто дублирование кода! Зачем?
	cardClone.querySelector(".card__like-button").addEventListener("click", (evt) => {

    evt.target.classList.toggle("card__like-button_active");

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
	addCardForm.reset(); //Зачем после этого деактивировать кнопку сабмита, если этим занимается другая функция и она прекрасно с этим справляется
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

popupGalleryContainer.addEventListener("click", onClickPopupContainer);
popupEditForm.addEventListener('submit', formSubmitEditProfileHandler);
editButton.addEventListener('click', onClickEditButton);
addCardForm.addEventListener('submit', formSubmitAddCardHandler);
closeButtons.forEach(button => button.addEventListener('click', onClickCloseButton));
addButton.addEventListener('click', onClickAddButton);
//cardsContainer.addEventListener('click', (evt) => {
//	if (evt.target.classList.contains('card__like-button')) {
//		evt.target.classList.toggle('card__like-button_active');
//	}
//});
