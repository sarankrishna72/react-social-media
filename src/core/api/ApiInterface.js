import axios from "./AxiosInstance";

export default class APIInterface {
  constructor(url) {
    this.url = url;
  }
  
  get(params) {
    return axios.get(this.url, { params });
  }

  post(postData) {
    return axios.post(this.url, postData);
  }

  patch(patchData) {
    return axios.patch(this.url, patchData);
  }

  delete() {
    return axios.delete(this.url);
  }

}
