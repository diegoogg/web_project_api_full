import React from "react";
import PopUpWithForm from "./PopUpWithForm";
import UserContext from "./UserContext";

export default function EditProfile({ handleClose, open, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(UserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopUpWithForm
      title="Editar Perfil"
      handleClose={handleClose}
      classId={"popup_container-profile"}
      open={open}
      onSubmit={handleSubmit}
      buttonTitle="Guardar"
    >
      <>
        <input
          type="text"
          placeholder="Nombre"
          className="popup__input popup__input_name"
          required
          onChange={(e) => setName(e.target.value)}
          minLength="2"
          maxLength="40"
          name="name"
          defaultValue={name}
        />
        <span className="popup__error popup__error_type_name"></span>
        <input
          type="text"
          placeholder="Acerca de mi"
          className="popup__input popup__input_about"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength="2"
          maxLength="200"
          name="about"
        />
        <span className="popup__error popup__error_type_about"></span>
      </>
    </PopUpWithForm>
  );
}
