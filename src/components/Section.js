export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector('.elements');
  }

  rendererItems(items) {
    this._cardsHtml = document.createElement('div');
    this._cardsHtml.classList.add(this._selector);
    items.forEach(item => {
      this._addItemDefault(this._renderer(item));
    })
    this._containerChild = this._container.querySelector(`.${this._selector}`);
    this._container.replaceChild(this._cardsHtml, this._containerChild);
  }

  _addItemDefault(item) {
    this._cardsHtml.append(item)
  }

  addItem(item) {
    this._container.querySelector(`.${this._selector}`).prepend(item)
  }
}