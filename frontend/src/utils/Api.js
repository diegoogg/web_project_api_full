class Api {
  constructor(url) {
    this._url = url;
    this._token = "Bearer " + localStorage.getItem("jwt");
  }

  setToken(token) {
    this._token = "Bearer " + token;
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
      },
      method: "GET",
    });
    return await res.json();
  }

  async getCards() {
    const res = await fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
      },
      method: "GET",
    });
    return await res.json();
  }

  async updateUser(name, about) {
    const res = await fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
    return await res.json();
  }

  async postCards(name, link) {
    const res = await fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
    return await res.json();
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._url}cards/${cardId}`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    return await res.json();
  }

  async deleteLike(cardId) {
    const res = await fetch(`${this._url}cards/likes/${cardId}`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    return await res.json();
  }

  async like(cardId) {
    const res = await fetch(`${this._url}cards/likes/${cardId}`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    return await res.json();
  }

  async updateAvatar(avatar) {
    const res = await fetch(`${this._url}users/me/avatar`, {
      headers: {
        authorization: this._token || localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
    return await res.json();
  }
}

const api = new Api("https://api.ogg.deltako.com/");

export default api;
