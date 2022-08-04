export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.name);
    this._profileAbout = document.querySelector(selectors.about);
    this._profileAvatar = document.querySelector(selectors.avatar)
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo(data) {
    this._name = data.name;
    this._about = data.about;
    this._profileName.textContent = this._name;
    this._profileAbout.textContent = this._about;
  }

  setUserAvatar(data) {
    this._avatar = data.avatar
    this._profileAvatar.src = this._avatar;
  }
}