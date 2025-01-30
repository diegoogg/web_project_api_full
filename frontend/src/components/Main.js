import profile from "../images/profile.png";
import "../blocks/profile.css";
import "../blocks/popup.css";
import "../blocks/elements.css";
import Card from "./Card";
import UserContext from "./UserContext";
import React from "react";
import EditButton from "../images/Edit-Button.png";
import AddButton from "../images/add-button.png";

function Main({
  handleEditAvatar,
  handleEditProfile,
  cards,
  handleAddPlace,
  handleCardClick,
  handleDeleteCard,
  handleCardLike,
}) {
  const currentUser = React.useContext(UserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__edit-avatar"
          onClick={handleEditAvatar}
        >
          <img
            src={currentUser.profile || profile}
            alt="Jacques Cousteau, explorador"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <p className="profile__name">{currentUser.name}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={handleEditProfile}
          >
            <img
              src={EditButton}
              alt="edit button"
              className="profile__edit-img"
            />
          </button>

          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add" onClick={handleAddPlace}>
          <img src={AddButton} alt="add button" className="profile__add-img" />
        </button>
      </section>
      <section className="elements">
        {cards.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            link={item.link}
            _id={item._id}
            likes={item.likes}
            owner={item.owner}
            handleCardClick={handleCardClick}
            handleDeleteCard={handleDeleteCard}
            handleCardLike={handleCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
