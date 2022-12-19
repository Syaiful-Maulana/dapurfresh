import axios from "axios";
import API_ENDPOINT from "../services/api/API_ENDPOINT";
import LOCAL_STORAGE from "../services/localStorage";

let refresh = false

axios.interceptors.request.use((config)=>{
    const token = LOCAL_STORAGE.getToken()
    config.headers.Authorization =  token ? `Bearer ${token}` : '';

    return config
});

axios.interceptors.response.use(res=>res, async error => {
    if(error.response.status === 403 && !refresh){
        refresh = true;
        const response = await axios.post(API_ENDPOINT.REFRESH)
        if (response.status === 200) {
            LOCAL_STORAGE.removeToken()
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            LOCAL_STORAGE.token(response.data.accessToken)
            
            return axios(error.config);
        } else {
            LOCAL_STORAGE.removeToken()
            window.location("/login")
        }
    }
    refresh = false;
    return Promise.reject(error)
})