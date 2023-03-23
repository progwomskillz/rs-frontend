import axios from "axios";
import serviceAuth from "services/auth";
import store from "store";

const makeRequest = ({ headers = {}, ...config }) =>
  axios({
    ...config,
    url: process.env.REACT_APP_API_URL + config.url,
    headers: {
      ...headers,
      Authorization: `Bearer ${store.getState().auth.access}`,
      "Content-Type": headers["Content-Type"]
        ? headers["Content-Type"]
        : "application/json",
    },
  })
    .then(({ data }) => data)
    .catch(async (error) => {
      if (
        error.response?.status !== 401 ||
        error.response?.config.url.endsWith("auth/refresh") ||
        error.response?.config.url.endsWith("auth/login") ||
        error.config.__isRetryRequest
      ) {
        return Promise.reject(error);
      }

      try {
        await serviceAuth.refresh();
      } catch (error) {
        serviceAuth.removeTokens();
        return Promise.reject(error);
      }

      error.config.__isRetryRequest = true;
      error.config.url = error.config.url.replace(
        process.env.REACT_APP_API_URL,
        ""
      );
      return makeRequest(error.config);
    });

const post = async (url, data = {}, params = {}) =>
  makeRequest({ method: "POST", url, data, params });

const get = async (url, params) => makeRequest({ method: "GET", url, params });

const put = async (url, data) => makeRequest({ method: "PUT", url, data });

const upload = async (url, data) =>
  makeRequest({
    method: "POST",
    url: url,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const service = {
  post,
  get,
  put,
  upload,
};

export default service;
