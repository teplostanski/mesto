import { PopupWithForm } from './PopupWithForm.js';

class PopupWithConfirmation extends PopupWithForm {
  constructor(selector, onFormSubmit) {
    super(selector, () => {});
    this._onConfirmationFormSubmit = onFormSubmit;
  }

  open(cardId, afterFormSubmit) {
    this._cardId = cardId;
    this._afterFormSubmit = afterFormSubmit;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._onConfirmationFormSubmit(this._cardId, this._afterFormSubmit);
    })
  }
}

export { PopupWithConfirmation };