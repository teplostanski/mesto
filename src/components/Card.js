class Card {
  constructor(card, templateSelector, userId, { handleCardClick, handleCardDelete, handleCardLike }) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _setEventListeners() {
    const cardNodeImg = this.element.querySelector('.card__img');
    cardNodeImg.addEventListener('click', this._handleCardClick);
    this.element.querySelector('.card__like-button').addEventListener('click', this._onLikeButtonClick.bind(this));
    this.element.querySelector('.card__delete-button').addEventListener('click', this._onDeleteButtonClick.bind(this));
  }

	_onLikeButtonClick() {
    const renderLike = (data) => {
      this._updateLikes(data.likes);
    };
    this._handleCardLike(this._card._id, renderLike, this._isLiked);
  }

  _onDeleteButtonClick(evt){
    this._handleCardDelete(this._card._id, () => {
      evt.target.closest('.card').remove();
    });
  }

	_updateLikes(likeOwners) {
    this.element.querySelector('.card__like-counter').textContent = likeOwners.length;
    const hasMyLike = likeOwners.find((owner) => owner._id === this._userId);
    const likeButton = this.element.querySelector('.card__like-button');

    if (hasMyLike) {
      likeButton.classList.add('card__like-button_active');
    } else {
      likeButton.classList.remove('card__like-button_active');
    }
    this._isLiked = hasMyLike;
  }

  _getTemplate () {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardNode = cardTemplate.content.firstElementChild.cloneNode(true);

    return cardNode;
  }

  createCardNode() {
    this.element = this._getTemplate();
    const cardNodeImg = this.element.querySelector('.card__img');
    cardNodeImg.setAttribute('src', this._card.link);
    cardNodeImg.setAttribute('alt', this._card.name);
    this.element.querySelector('.card__capture').textContent = this._card.name;
		//this.element.querySelector('.card__like-counter').textContent = this._card.likes.length;
		this._updateLikes(this._card.likes);
		if(this._card.owner._id === this._userId) {
      this.element.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
    }
    this._setEventListeners();

    return this.element;
  }
}
export { Card };