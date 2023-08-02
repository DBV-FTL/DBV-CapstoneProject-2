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
    console.log('in request')
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    try {
      console.log('res incoming')
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
  async loginProvider(creds) {
    return await this.request({
     endpoint: "auth/provider/login",
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
      method: "POST",
      data: creds,
    });
    // if (response.status===200){

    // }
    // this.setToken(this.tokenName, data.token)
  }

  async signupProvider(creds) {
    console.log('signing up', creds)
    // await axios.post(`${this.remoteHostUrl}auth/user/register`, {data:creds})
    return await this.request({
      endpoint: "auth/provider/register",
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
async logoutProvider() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }

  async addNewItem(creds) {
    console.log('new item!!', creds)
    // await axios.post(`${this.remoteHostUrl}auth/user/register`, {data:creds})
    return await this.request({
      endpoint: "menu/create",
      method: "POST",
      data: creds,
    });
  }

  async fetchMenuItems(id){
    return await this.request({endpoint: `menu/${id}`});
  }

  async fetchMenuItem(id){
    console.log('hello?')
    return await this.request({endpoint: `menu/food/${id}`});
  }

  async fetchServicesByZip(){
    return await this.request({endpoint: `auth/provider`});
  }


  async fetchUserFromToken(){
    return await this.request({
      endpoint: "auth/verify",
      method: "POST",
      data: {},
    });
  }
  // async fetchServices(){
  //   return await this.request({endpoint: ''})
  // }
    // if (response.status===200){

    // }
    // this.setToken(this.tokenName, data.token)
  
//   async logSleep(sleep) {
//     return await this.request({
//       endpoint: "sleep/new",
//       method: "POST",
//       data: sleep,
//     });
//   }

  async fetchPaymentIntent(){
    return await this.request({endpoint: "payment/create-payment-intent", method: "POST"})
  }

}
export default new ApiClient("http://localhost:3000");