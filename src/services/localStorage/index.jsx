const LOCAL_STORAGE = {
  setDataUser(data) {
      return localStorage.setItem("user", JSON.stringify(data));
  },
  getDataUser() {
      return JSON.parse(localStorage.getItem("user"));
  },
  removeDataUser() {
      return localStorage.removeItem("user");
  },
  token(token) {
    return localStorage.setItem("token", token)
  },
  getToken() {
    return localStorage.getItem("token")
  },
  removeToken() {
    return localStorage.removeItem("token")
  },
  clearLocalStorage() {
    return localStorage.clear();
  }
};

export default LOCAL_STORAGE;