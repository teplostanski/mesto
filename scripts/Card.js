class Card {
  constructor(card, onClickByImg, templateSelector) {
    this.card = card;
    this.templateSelector = templateSelector;
    this.onClickByImg = onClickByImg;
  }

  _setEventListeners(cardClone, cardCloneImage) {
    cardCloneImage.addEventListener('click', this.onClickByImg);

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
    const cardTemplate = document.querySelector(this.templateSelector);
    const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
    const cardCloneImage = cardClone.querySelector('.card__img');
    cardCloneImage.setAttribute('src', this.card.link);
    cardCloneImage.setAttribute('alt', this.card.alt);
    cardClone.querySelector('.card__capture').textContent = this.card.name;


    this._setEventListeners(cardClone, cardCloneImage);
    return cardClone;
  }
}