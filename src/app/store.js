import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import cartReducer from "../features/cartSlice";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/userSlice";

export const reducers = combineReducers({
    cart: cartReducer,
    user: userSlice,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
const persistor = persistStore(store);
export { store, persistor };
