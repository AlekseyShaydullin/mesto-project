export class Card {
  constructor(data, selector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._userId = userId;
    this._selector = selector;
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
    if (this._likes.find((_id) => _id === this._userId)) {
      likeCard.classList.add('element__button-like_active');
    }
  }

  _statusTrash() {
    if (this._userId !== this._owner._id) {
      this._buttonTrashCard.classList.add('element__button-trash_disactiv');
    }
  }

  // _setEventListener() {
  //   this._likeCard.addEventListener('click', () => {
  //     if (this._likeCard.classList.contains('element__button-like_active')) {
  //       this._delLike();
  //     } else {
  //       this._addLike();
  //     }
  //   })
  // }

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
    return this._element;
  }
}