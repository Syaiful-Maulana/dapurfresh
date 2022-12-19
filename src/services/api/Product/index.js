import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";

const Product = {
  async getAllProducts() {
    try {
      const response = await axios.get(API_ENDPOINT.PRODUCT, {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getSingleProduct() {
    try {
      const response = await axios.get(API_ENDPOINT.PRODUCT, {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getPopularProduct() {
    try {
      const response = await axios.get(`${API_ENDPOINT.PRODUCT}/popular`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getProductsOnCategory(id) {
    try {
      const response = await axios.get(
        `${API_ENDPOINT.CATEGORY}/product/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Product;
