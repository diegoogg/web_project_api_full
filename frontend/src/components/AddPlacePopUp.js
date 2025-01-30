import React from "react";
import PopUpWithForm from "./PopUpWithForm";

export default function AddPlacePopUp({ open, handleClose, onSubmitAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmitAddPlace({ name, link });
  }

  return (
    <PopUpWithForm
      title="Nuevo Lugar"
      handleClose={handleClose}
      classId={"popup_container-place"}
      open={open}
      onSubmit={handleSubmit}
      buttonTitle="Guardar"
    >
      <input
        type="text"
        placeholder="Titulo"
        className="popup__input popup__input_place"
        required
        minLength="2"
        maxLength="30"
        onChange={(e) => setName(e.target.value)}
        name="name"
      />
      <span className="popup__error popup__error_type_place"></span>
      <input
        type="url"
        placeholder="Enlace a la imagen"
        className="popup__input popup__input_src"
        required
        onChange={(e) => setLink(e.target.value)}
        name="link"
      />
      <span className="popup__error popup__error_type_url"></span>
    </PopUpWithForm>
  );
}
