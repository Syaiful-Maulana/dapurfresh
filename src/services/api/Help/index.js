import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";

const Help = {
  async help() {
    try {
      const response = await axios.get(API_ENDPOINT.HELP);
      return response
    } catch (error) {
      console.log(error);
    }
  },
};

export default Help;
