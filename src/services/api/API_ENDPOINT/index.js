const BASE_URL = import.meta.env.VITE_BASE_URL

const API_ENDPOINT = {
    AUTH:{
        LOGIN: `${BASE_URL}/api/v1/auth/login`,
        REGISTER: `${BASE_URL}/api/v1/auth/register`
    },
    PRODUCT: `${BASE_URL}/api/v1/product`,
    CART: `${BASE_URL}/api/v1/cart`,
    CATEGORY: `${BASE_URL}/api/v1/category`,
    USER: `${BASE_URL}/api/v1/profile`,
    ORDER: `${BASE_URL}/api/v1/orders`,
    HISTORY_ORDER : `${BASE_URL}/api/v1//orders/user/lastsevendays`,
    HELP : `${BASE_URL}/api/v1//help/`,
    REFRESH: `${BASE_URL}/api/v1/auth/token`
}

export default API_ENDPOINT