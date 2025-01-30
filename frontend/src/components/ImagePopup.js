export default function ImagePopup({
  classId,
  open,
  handleClose,
  selectedCard,
}) {
  return (
    <div className={`popup ${classId} ${open ? "popup_opened" : ""}`}>
      <div className="popup__form"></div>
      <div className="popup__form-image">
        <button className="popup__close" onClick={handleClose}></button>
        <img
          className="popup__image"
          alt={selectedCard.name}
          src={selectedCard.link}
        />
        <p className="popup__image-title">{selectedCard.name}</p>
      </div>
    </div>
  );
}
