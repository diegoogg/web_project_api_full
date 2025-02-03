import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopUpWithForm from "./PopUpWithForm";
import React from "react";
import api from "../utils/Api";
import ImagePopUp from "./ImagePopup";
import EditAvatar from "./EditAvatar";
import EditProfile from "./EditProfile";
import AddPlacePopUp from "./AddPlacePopUp";
import UserContext from "./UserContext";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import Register from "../components/Register";
import * as auth from "../utils/auth.js";

function App() {
  const [isPopupProfileOpen, setPopupProfileOpen] = React.useState(false);
  const [isPopupAddPlace, setPopupAddPlace] = React.useState(false);
  const [isPopupEditAvatar, setPopupEditAvatar] = React.useState(false);
  const [isPopupDeleteCard, setPopupDeleteCard] = React.useState(false);
  const [isPopupImageOpen, setPopupImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  const closeAllPopups = () => {
    setPopupProfileOpen(false);
    setPopupAddPlace(false);
    setPopupEditAvatar(false);
    setPopupImageOpen(false);
    setPopupDeleteCard(false);
    document.removeEventListener("keypress", handleEscPress);
  };

  const handleEditProfile = () => {
    setPopupProfileOpen(true);
    addHandleEscPress();
  };

  const handleAddPlace = () => {
    addHandleEscPress();
    setPopupAddPlace(true);
  };

  const handleEditAvatar = () => {
    setPopupEditAvatar(true);
    addHandleEscPress();
  };

  const handleDeleteCard = (card) => {
    setSelectedCard(card);
    setPopupDeleteCard(true);
    addHandleEscPress();
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setPopupImageOpen(true);
    addHandleEscPress();
  };

  const handleCardLike = (card, removeLike) => {
    if (removeLike) {
      return api.deleteLike(card._id).then(() => {
        api.getCards().then((cardsData) => {
          setCards(cardsData);
        });
      });
    } else {
      return api.like(card._id).then(() => {
        api.getCards().then((cardsData) => {
          setCards(cardsData);
        });
      });
    }
  };

  const onSubmitDeleteCard = (event) => {
    event.preventDefault();
    return api.deleteCard(selectedCard._id).then(() => {
      closeAllPopups();
      setCards(cards.filter((card) => card._id !== selectedCard._id));
    });
  };

  const onSubmitEditProfile = ({ name, about }) => {
    return api.updateUser(name, about).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  };

  const onSubmitAddPlace = ({ name, link }) => {
    return api.postCards(name, link).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    });
  };

  const onSubmitEditAvatar = ({ avatar }) => {
    return api.updateAvatar(avatar).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  };

  const addHandleEscPress = () => {
    document.addEventListener("keydown", handleEscPress);
  };

  const handleEscPress = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo().then((user) => {
        setCurrentUser(user);
        api.getCards().then((cardsData) => {
          setCards(cardsData);
        });
      });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push("/login");
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push("/home");
          }
        })
        .catch((err) => console.log(err));
    }

    return;
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    tokenCheck();
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          handleLogout={handleLogout}
        />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login
              setIsLoggedIn={setIsLoggedIn}
              handleLogin={handleLogin}
              email={email}
              setEmail={setEmail}
            />
          </Route>
          <ProtectedRoute path="/home" isLoggedIn={isLoggedIn}>
            <Main
              handleEditAvatar={handleEditAvatar}
              handleEditProfile={handleEditProfile}
              handleAddPlace={handleAddPlace}
              handleDeleteCard={handleDeleteCard}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              cards={cards}
            />
            <Footer />
            <EditAvatar
              handleClose={closeAllPopups}
              open={isPopupEditAvatar}
              onUpdateAvatar={onSubmitEditAvatar}
            />
            <EditProfile
              handleClose={closeAllPopups}
              open={isPopupProfileOpen}
              onUpdateUser={onSubmitEditProfile}
            />
            <AddPlacePopUp
              handleClose={closeAllPopups}
              open={isPopupAddPlace}
              onSubmit={onSubmitAddPlace}
            />
            <PopUpWithForm
              title="Estas seguro?"
              handleClose={closeAllPopups}
              classId={"popup_confirmation"}
              open={isPopupDeleteCard}
              onSubmit={onSubmitDeleteCard}
              buttonTitle="Si"
            />
            <ImagePopUp
              classId={"popup_card"}
              handleClose={closeAllPopups}
              selectedCard={selectedCard}
              open={isPopupImageOpen}
            />
          </ProtectedRoute>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/register" />}
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
