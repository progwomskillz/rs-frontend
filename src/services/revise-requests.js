import serviceApi from "services/api";

const baseURL = "revise-requests";

const create = poll_id => serviceApi.post(baseURL, { poll_id });

const getPage = (page, page_size) => serviceApi.get(baseURL, { page, page_size });

const service = {
  create,
  getPage
};

export default service;
