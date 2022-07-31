export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector('.elements');
  }

  rendererItems() {
    this._cardsHtml = document.createElement('div');
    this._cardsHtml.classList.add(this._selector);
    this._items.forEach(item => {
      this.addItem(this._renderer(item));
    })
    this._containerChild = this._container.querySelector(`.${this._selector}`);
    this._container.replaceChild(this._cardsHtml, this._containerChild);
  }

  addItem(item) {
    this._cardsHtml.append(item)
  }
}