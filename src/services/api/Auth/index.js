import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";
import LOCAL_STORAGE from "../../localStorage";

const Auth = {
  async login(username, password){
    const response = await axios(API_ENDPOINT.AUTH.LOGIN, {
      method: "post",
      headers: {"Content-Type" : "application/json"},
      data: {
        username: username,
        password: password
      }
    })
    const {accessToken} = await response.data?.data?.accessToken
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    LOCAL_STORAGE.token(accessToken)

    return response;
  },

  async register(username, password, ref_code){
    const response = await axios(API_ENDPOINT.AUTH.REGISTER, {
      method: "post",
      headers: {"Content-Type" : "application/json"},
      data: {
        username : username,
        password : password,
        ref_code : ref_code
      }
    })
    return response;
  },

  logout() {
    LOCAL_STORAGE.removeDataUser()
  }
}
 
export default Auth;