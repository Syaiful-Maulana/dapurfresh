import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";

const Categories = {
  async getAllCategories(){
    try {
      const response = await axios.get(API_ENDPOINT.CATEGORY)
      return(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export default Categories;