import serviceApi from "services/api";

const baseURL = "revise-requests";

const create = poll_id => serviceApi.post(baseURL, { poll_id });

const service = {
  create
};

export default service;
