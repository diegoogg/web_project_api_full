export default class Card {
  constructor(
    name,
    link,
    templateSelector,
    { handleClick, handleDeleteCard, handleDeleteLike, handleAddlike },
    likes,
    _id,
    owner,
    user
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleClick = handleClick;
    this._likes = likes;
    this._handleDeleteCard = handleDeleteCard;
    this._handleDeleteLike = handleDeleteLike;
    this._handleAddLike = handleAddlike;
    this._id = _id;
    this._owner = owner;
    this._user = user;
  }

  _hasLike() {
    return this._likes.some((like) => like._id === this._user._id);
  }

  _cardOwner() {
    return this._owner._id === this._user._id;
  }
  _getCard() {
    const template = document.querySelector(this._templateSelector);
    const templadeNode = template.content.querySelector(".elements__card");
    const cardNode = templadeNode.cloneNode(true);

    cardNode.querySelector(".elements__image").src = this._link;
    cardNode.querySelector(".elements__image").alt =
      "Imagen de : " + this._name;
    cardNode.querySelector(".elements__image-description-title").textContent =
      this._name;

    cardNode
      .querySelector(".elements__image-delete-btn")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._id, () => {
          cardNode.remove();
        });
      });

    if (this._likes) {
      cardNode.querySelector(".elements__counter").textContent =
        this._likes.length;
    }
    if (!this._cardOwner()) {
      cardNode.querySelector(".elements__image-delete-btn").remove();
    }
    const likeBtn = cardNode.querySelector(".elements__image-like-btn");
    if (this._hasLike()) {
      likeBtn.classList.add("elements__image-like-btn-active");
    }

    return cardNode;
  }

  _setEventListeners(cardNode) {
    const likeBtn = cardNode.querySelector(".elements__image-like-btn");

    likeBtn.addEventListener("click", () => {
      if (this._hasLike()) {
        this._handleDeleteLike(this._id).then((card) => {
          this._likes = card.likes;
          cardNode.querySelector(".elements__counter").textContent =
            this._likes.length;
          likeBtn.classList.remove("elements__image-like-btn-active");
        });
      } else {
        this._handleAddLike(this._id).then((card) => {
          this._likes = card.likes;
          cardNode.querySelector(".elements__counter").textContent =
            this._likes.length;
          likeBtn.classList.add("elements__image-like-btn-active");
        });
      }
    });

    cardNode.querySelector(".elements__image").addEventListener("click", () => {
      this._handleClick(this._name, this._link);
    });
  }

  returnCard() {
    const node = this._getCard();
    this._setEventListeners(node);
    return node;
  }
}
