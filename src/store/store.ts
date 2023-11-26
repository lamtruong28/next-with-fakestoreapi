import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";

const store = configureStore({
    reducer: {
        carts: cartReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
