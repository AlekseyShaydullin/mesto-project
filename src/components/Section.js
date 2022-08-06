export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  rendererItems(items) {
    items.forEach(item => {
      this.addItem(this._renderer(item));
    })
  }

  addItem(item) {
    this._container.append(item)
  }
}