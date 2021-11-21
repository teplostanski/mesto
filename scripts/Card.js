export class Card {
  constructor({ data, onClickByImg }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
		this._evt = data.evt;
    this._templateSelector = templateSelector;
    this.onClickByImg = onClickByImg;
  }

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

	_onLikeButtonClick() {
		this._likeButton.classList.toggle('card__like-button_active');
	}

	_onDeleteButtonClick() {
		this._element.remove();
		this._element.innerHTML = null;
	}
}