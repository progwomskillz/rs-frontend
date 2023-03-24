import serviceApi from "services/api";

const baseURL = "polls";

const create = (communityName, communitySize, file) => {
  const formData = new FormData();
  formData.append("community_name", communityName);
  formData.append("community_size", communitySize);
  formData.append("file", file);

  return serviceApi.upload(baseURL, formData);
}

const getPage = (page, page_size, user_id) => {
  const params = { page, page_size };
  if (user_id) {
    params.user_id = user_id;
  }
  return serviceApi.get(baseURL, params);
}

const service = {
  create,
  getPage
};

export default service;
