import React from "react";
import PopUpWithForm from "./PopUpWithForm";

export default function EditAvatar({ handleClose, open, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopUpWithForm
      title="Cambiar foto de perfil"
      handleClose={handleClose}
      classId={"popup_avatar"}
      open={open}
      onSubmit={handleSubmit}
      buttonTitle="Guardar"
    >
      <input
        type="url"
        placeholder="Enlace a la imagen"
        className="popup__input popup__input_avatar"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__error"></span>
    </PopUpWithForm>
  );
}
