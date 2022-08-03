export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.name);
    this._profileAbout = document.querySelector(selectors.about);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo(data) {

  }
}