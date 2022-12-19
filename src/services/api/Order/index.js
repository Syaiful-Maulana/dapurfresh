import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Order = {
  async userOrder(data) {
    try {
      const response = await axios.post(API_ENDPOINT.ORDER, data);
      console.log(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async historyOrder() {
    try {
      const response = await axios.get(API_ENDPOINT.HISTORY_ORDER);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async orderDetail(id) {
    try {
      let API = `${BASE_URL}/api/v1//orders/${id}/detail/user`;
      const response = await axios.get(API);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async historyStatus(id) {
    console.log(id)
    let data = {status : "Batal"}
    try {
      const response = await axios.patch(`${API_ENDPOINT.ORDER}/${id}/status`, data
      )
      return(response)
    } catch (error) {
      console.log(error)
    }
  }
};

export default Order;
