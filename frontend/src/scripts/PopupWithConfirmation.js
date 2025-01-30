import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
  }
  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    const popupOpen = document.querySelector(this._popup);
    popupOpen
      .querySelector(".popup__button-confirmation")
      .addEventListener("click", () => {
        this._handleConfirm().then(() => {
          this.close();
        });
      });
  }
}
