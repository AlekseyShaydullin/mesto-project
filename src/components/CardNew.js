export default class Card {
  constructor(data, selector, userId, handleLikeCard, openPopupImage, deleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._userId = userId;
    this._selector = selector;
    this._handleLikeCard = handleLikeCard;
    this._openPopupImage = openPopupImage;
    this._deleteCard = deleteCard;
  }

  _getTemplateCard() {
    return document
      .querySelector(`${this._selector}`)
      .content.querySelector('.element')
      .cloneNode(true)
  }

  _addLike(res) {
    this._likeCard.classList.add('element__button-like_active');
    this._counterLikes.textContent = res.likes.length;
  }

  _delLike(res) {
    this._likeCard.classList.remove('element__button-like_active');
    this._counterLikes.textContent = res.likes.length;
  }

  _statusLike() {
    if (this._likes.find((like) => like._id === this._userId._id)) {
      this._likeCard.classList.add('element__button-like_active');
    }
  }

  _statusTrash() {
    if (this._userId._id !== this._owner._id) {
      this._buttonTrashCard.classList.add('element__button-trash_disactiv');
    }
  }

  _setEventListener() {
    this._likeCard.addEventListener('click', () => {
      this._handleLikeCard(this._id, this._likeCard)
    })
    this._img.addEventListener('click', () => {
      this._openPopupImage(this._name, this._link);
    })
    this._buttonTrashCard.addEventListener('click', () => {
      this._deleteCard(this._element.id);
    })
  }

  createCard() {
    this._element = this._getTemplateCard();
    this._img = this._element.querySelector('.element__foto');
    this._element.querySelector('.element__caption-town').textContent = this._name;
    this._likeCard = this._element.querySelector('.element__button-like');
    this._buttonTrashCard = this._element.querySelector('.element__button-trash');
    this._counterLikes = this._element.querySelector('.element__button-like-count');
    this._img.src = this._link;
    this._img.alt = this._name;
    this._element.id = this._id;
    this._counterLikes.textContent = this._likes.length;
    this._statusLike();
    this._statusTrash();
    this._setEventListener()
    return this._element;
  }
}