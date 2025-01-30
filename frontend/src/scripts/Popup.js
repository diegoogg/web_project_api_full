export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this.setEventListeners();
  }
  open() {
    const popupOpen = document.querySelector(this._popup);
    popupOpen.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    const popupOpen = document.querySelector(this._popup);
    popupOpen.classList.remove("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const popupOpen = document.querySelector(this._popup);

    const closeBtn = popupOpen.querySelector(".popup__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
