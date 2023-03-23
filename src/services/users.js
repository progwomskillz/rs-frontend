import serviceApi from "services/api";

const baseURL = "users";

const getPage = (role, page, page_size) => serviceApi.get(
  baseURL,
  { role, page, page_size }
);

const create = (username, password, first_name, last_name, role) => serviceApi.post(
  baseURL,
  { username, password, first_name, last_name, role }
)

const service = {
  getPage,
  create
};

export default service;
