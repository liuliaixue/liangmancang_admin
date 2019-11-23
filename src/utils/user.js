function setToken(token) {
  window.localStorage.setItem('token', token);
}
function getToken() {
  return window.localStorage.getItem('token');
}
function setUser(user) {
  window.localStorage.setItem('user', JSON.stringify(user));
}
function getUser() {
  return JSON.parse(window.localStorage.getItem('user'));
}

export { setToken, getToken, setUser, getUser };
