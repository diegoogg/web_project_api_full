import React from "react";
import PopUpWithForm from "./PopUpWithForm";
import "../blocks/popup.css";

export default function InfotoolTip({ handleClose, open, isSuccess }) {
  return (
    <>
      <PopUpWithForm
        handleClose={handleClose}
        open={open}
        classId={isSuccess}
        showSubmitButton={false}
      >
        <div
          className={
            isSuccess ? "popup__register_alert" : "popup__register_alert_wrong"
          }
        >
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </div>
      </PopUpWithForm>
    </>
  );
}
