import axios from 'axios';

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "interzine_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = "GET", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    try {
      const result = await axios({ url, method, data, headers });
      return { data: result.data, error: null, status: result.status };
    } catch (err) {
      console.error({ errorResponse: err.response });
      const message = err?.response?.data?.error?.message;
      return { data: null, error: message || String(err) };
    }
  }

  async loginUser(creds) {
     return await this.request({
      endpoint: "auth/user/login",
      method: "POST",
      data: creds,
    });
    // console.log('data login', data)
    // this.setToken(this.tokenName, data.token)
  }
  async signupUser(creds) {
    console.log('signing up')
    // await axios.post(`${this.remoteHostUrl}auth/user/register`, {data:creds})
    return await this.request({
      endpoint: "auth/user/register",
      method: "post",
      data: creds,
    });
    // if (response.status===200){

    // }
    // this.setToken(this.tokenName, data.token)
  }
  async logoutUser() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }
}
export default new ApiClient("http://localhost:3000");