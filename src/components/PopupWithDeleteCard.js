import Popup from "./Popup";

export default class PopupWithDeleteCard extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }

  openPopup(id) {
    super.openPopup()
    this.setEventListener(id)
  }

  setEventListener(id) {
    super.setEventListener();
    console.log('hi');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log('hi');
      this._submit(id)
    })
  }
}