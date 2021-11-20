//import {onClickByImg} from './index.js'

export class Card {
  constructor({ data, onClickByImg }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
		this._evt = data.evt;
    this._templateSelector = templateSelector;
    this.onClickByImg = onClickByImg;
  }

  //createCardNode() {
  //  const cardTemplate = document.querySelector(this._templateSelector);
  //  const cardClone = cardTemplate.content.firstElementChild.cloneNode(true);
  //  const cardCloneImage = cardClone.querySelector('.card__img');
  //  cardCloneImage.setAttribute('src', this._link);
  //  cardCloneImage.setAttribute('alt', this._alt);
  //  cardClone.querySelector('.card__capture').textContent = this._name;


  //  this._setEventListeners(cardClone, cardCloneImage);
  //  return cardClone;
  //}
	_getTemplate() {
		const cardTemplate = document
		.querySelector(this._templateSelector)
		.content
		.querySelector('.card')
		.cloneNode(true);

		return cardTemplate;
	}

	createCardNode() {
			this._element = this._getTemplate();

			this._cardImage = this._element.querySelector('.card__img');
			this._likeButton = this._element.querySelector('.card__like-button');

			this._cardImage.src = this._link;
			this._cardImage.alt = this._name;
			this._element.querySelector('.card__capture').textContent = this._name;

			this._setEventListeners();
		return this._element;
	}

	//_setEventListeners() {
  //  cardCloneImage.addEventListener('click', () => this._onClickByImg(this._link, this._name));

  //  cardClone.querySelector('.card__like-button').addEventListener('click', this._onLikeButtonClick);

  //  cardClone.querySelector('.card__delete-button').addEventListener('click', this._onDeleteButtonClick);

  //}

  //_onLikeButtonClick(evt) {
  //  evt.target.classList.toggle('card__like-button_active');
  //}

  //_onDeleteButtonClick(evt){
  //  evt.target.closest('.card').remove();
  //}

	_setEventListeners() {

		this._likeButton.addEventListener('click', () => {
				this._onLikeButtonClick();
			});

		this._element.querySelector('.card__delete-button').addEventListener('click', () => {
				this._onDeleteButtonClick();
		});

		this._cardImage.addEventListener('click', () => {
			this.onClickByImg(this._evt);
		});


}

// функция лайков
_onLikeButtonClick() {
		this._likeButton.classList.toggle('card__like-button_active');
}

// функция удаления
_onDeleteButtonClick() {
		this._element.remove();
		this._element.innerHTML = null;

}
}