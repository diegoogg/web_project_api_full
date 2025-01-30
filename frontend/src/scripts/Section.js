export default class Section {
  constructor({ items, renderer }, styleSelector) {
    this._items = items;
    this._renderer = renderer;
    this._styleSelector = document.querySelector(styleSelector);
  }
  renderer() {
    this._items.forEach((item) => {
      const node = this._renderer(item);
      this.addItem(node);
    });
  }
  addItem(element) {
    this._styleSelector.append(element);
  }
}
