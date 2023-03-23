import serviceApi from "services/api";
import store from "store";
import { setTokens } from "slicers/auth";

const baseURL = "auth";

const saveTokens = ({ access, refresh }) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  store.dispatch(setTokens({ access, refresh }));
};

const refresh = () => serviceApi.post(
  `${baseURL}/refresh`,
  { refresh: store.getState().auth.refresh }
)
.then(saveTokens);

const removeTokens = () => saveTokens({ access: "", refresh: "" });

const getValueFromTokenPayload = (token, key) =>
  JSON.parse(atob(token.split(".")[1]))[key];

const getPrincipalRole = () => getValueFromTokenPayload(
  store.getState().auth.refresh, "user_role"
);

const signIn = (username, password) => serviceApi.post(
  `${baseURL}/login`,
  { username, password }
)
.then(saveTokens);

const loadTokens = () => {
  const access = localStorage.getItem("access") || "";
  const refresh = localStorage.getItem("refresh") || "";
  store.dispatch(setTokens({ access, refresh }));
};

const getTokens = () => ({
  access: store.getState().auth.access,
  refresh: store.getState().auth.refresh
});

const getExpirationDate = token => new Date(getValueFromTokenPayload(token, "exp") * 1000);

const isAuthed = (refreshToken) => {
  if (!refreshToken) {
    return false;
  }
  return new Date() < getExpirationDate(refreshToken);
};

const signOut = () => serviceApi.post(`${baseURL}/logout`)
  .then(removeTokens);

const service = {
  saveTokens,
  refresh,
  removeTokens,
  getValueFromTokenPayload,
  getPrincipalRole,
  signIn,
  loadTokens,
  getTokens,
  isAuthed,
  signOut
};

export default service;
