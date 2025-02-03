import React from "react";
import UserContext from "./UserContext";
import "../blocks/elements.css";

export default function Card({
  name,
  link,
  handleCardClick,
  handleDeleteCard,
  handleCardLike,
  likes,
  _id,
  owner,
}) {
  const user = React.useContext(UserContext);

  const hasLike = () => {
    return likes.some((like) => like._id === user._id);
  };

  const cardOwner = () => {
    return owner === user._id;
  };

  const handleClick = () => {
    handleCardClick({ name, link, _id });
  };

  const deleteCard = () => {
    handleDeleteCard({ _id });
  };

  function handleLike() {
    handleCardLike({ _id }, hasLike());
  }

  return (
    <div className="template" id="template">
      <figure className="elements__card">
        <img
          className="elements__image"
          alt={name}
          src={link}
          onClick={handleClick}
        />
        {cardOwner() && (
          <button
            type="button"
            className="elements__image-delete-btn"
            onClick={deleteCard}
          ></button>
        )}
        <figcaption className="elements__image-description">
          <p className="elements__image-description-title">{name}</p>
          <button
            className={`elements__image-like-btn ${
              hasLike() ? "elements__image-like-btn-active" : " "
            }`}
            type="button"
            onClick={handleLike}
          >
            <p className="elements__counter">{likes.length}</p>
          </button>
        </figcaption>
      </figure>
    </div>
  );
}
