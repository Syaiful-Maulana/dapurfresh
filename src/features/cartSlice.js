import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products:[],
        amount: 0,
        totalPrice: 0
    },
    reducers: {
        addAmount: (state) => {
            state.amount += 1
        },
        increase: (state, { payload }) => {
            const cartItem = state.products.find((item) => item.product_id === payload.product_id);
            if(cartItem.stock <= payload.displayQty){
                return console.log("Stok tidak tersedia lagi");
            }
            cartItem.qty = cartItem.qty + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.products.find((item) => item.product_id === payload);
            cartItem.qty = cartItem.qty - 1;
            if(cartItem.qty === 0){
                state.amount -= 1
                state.products = state.products.filter(
                    (item) => item.product_id !== payload
                );
            }
        },
        addProduct: (state, {payload}) => {
            state.products.push({...payload, qty: 1})
        },
        clearProducts: (state) => {
            state.products = []
            state.amount = 0
        }
    },
});

export const { addAmount, increase, decrease, addProduct, clearProducts } = cartSlice.actions;
export default cartSlice.reducer;
