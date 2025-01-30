export default class FormValidator {
  constructor(formElement, formConfig) {
    this._formElement = formElement;
    this._formConfig = formConfig;
  }

  _setEventListeners(form, formConfig) {
    const inputList = Array.from(
      form.querySelectorAll(formConfig.inputSelector)
    );
    const buttonSubmit = form.querySelector(formConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const errorMsg = form.querySelector(
          `.popup__error_type_${inputElement.name}`
        );
        if (!inputElement.validity.valid) {
          inputElement.classList.add(formConfig.inputErrorClass);
          errorMsg.textContent = inputElement.validationMessage;
        } else {
          inputElement.classList.remove(formConfig.inputErrorClass);
          errorMsg.textContent = "";
        }
        buttonSubmit.disabled = !this._hasValidInput(inputList);
      });
    });
    buttonSubmit.disabled = !this._hasValidInput(inputList);
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._formConfig);
  }

  _hasValidInput(inputList) {
    return inputList.every((item) => {
      return item.validity.valid;
    });
  }
}
