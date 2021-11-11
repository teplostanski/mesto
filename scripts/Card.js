//import {onClickByImg} from './index.js'

export class Card {
  constructor(card, onClickByImg, templateSelector) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._onClickByImg = onClickByImg;
  }

  _setEventListeners(cardClone, cardCloneImage) {
    cardCloneImage.addEventListener('click', () => this._onClickByImg(this._card.link, this._card.name));

    cardClone.querySelector('.card__like-button').addEventListener('click', this._onLikeButtonClick);

    cardClone.querySelector('.card__delete-button').addEventListener('click', this._onDeleteButtonClick);

  }

  _onLikeButtonClick(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _onDeleteButtonClick(evt){
    evt.target.closest('.card').remove();
  }

  createCardNode() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardClone = cardTemplate.content.firstElementChild.cloneNode(true);
    const cardCloneImage = cardClone.querySelector('.card__img');
    cardCloneImage.setAttribute('src', this._card.link);
    cardCloneImage.setAttribute('alt', this._card.alt);
    cardClone.querySelector('.card__capture').textContent = this._card.name;


    this._setEventListeners(cardClone, cardCloneImage);
    return cardClone;
  }
}