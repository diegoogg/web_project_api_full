import React from "react";

export default function PopUpWithForm({
  open,
  handleClose,
  classId,
  title,
  children,
  onSubmit,
  buttonTitle,
  showSubmitButton = true,
}) {
  return (
    <div className={`popup ${classId} ${open ? "popup_opened" : ""}`}>
      <form className="popup__form" onSubmit={onSubmit}>
        <fieldset className="popup__info">
          <button
            className="popup__close"
            onClick={handleClose}
            type="button"
          ></button>
          <h3 className="popup__title">{title}</h3>
          {children}
          {showSubmitButton && (
            <button type="submit" className="popup__button">
              {buttonTitle}
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
}
