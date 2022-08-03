export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector('.popup__close-icon');
    this._keyCodeEsc = 27;
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this._setDefaultEventListener()
  }

  closePopup () {
    this._popup.classList.remove('popup_opened');
    this._removeDefaultEventListener();
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode === this._keyCodeEsc) {
      this.closePopup();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === this._popup) {
      this.closePopup();
    }
  }

  _setDefaultEventListener() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }

  _removeDefaultEventListener() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
  }

  setEventListener() {
    this._buttonClose.addEventListener('click', () => this.closePopup());
  }
}