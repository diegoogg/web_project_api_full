import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(name, link) {
    super.open();

    const popup = document.querySelector(this._popup);

    popup.querySelector(".popup__image").setAttribute("alt", name);
    popup.querySelector(".popup__image").setAttribute("src", link);
    popup.querySelector(".popup__image-title").textContent = name;
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
