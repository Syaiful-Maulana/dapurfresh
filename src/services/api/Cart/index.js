import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";

const Cart = {
    async getAllCarts() {
        const response = await axios.get(API_ENDPOINT.CART);
        return response;
    },

    async addProduct({product_id, qty}) {
        try {
            const response = await axios.post(API_ENDPOINT.CART, {
                data: {
                    product_id,
                    qty,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    async updateProduct({product_id, qty}) {
        try {
            const response = await axios.get(API_ENDPOINT.CART, {
                data: {
                    product_id,
                    qty,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    async deleteProduct(product_id) {
        try {
            const response = await axios.get(API_ENDPOINT.CART, {
                data: {
                    product_id,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default Cart;
