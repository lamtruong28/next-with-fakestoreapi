import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TypeState = {
    carts: ICart[];
};

const initialState = {
    carts: [],
} as TypeState;
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, actions: PayloadAction<ICart>) => {
            const isExists = state.carts.find(
                (cart) => cart.productId === actions.payload.productId
            );
            if (isExists) {
                state.carts = state.carts.map((cart) => {
                    return cart.productId === actions.payload.productId
                        ? {
                              ...cart,
                              quantity:
                                  cart.quantity + actions.payload.quantity,
                          }
                        : cart;
                });
            } else state.carts.unshift(actions.payload);
        },
        removeCartItem: (state, actions: PayloadAction<number>) => {
            state.carts = state.carts.filter(
                (cart) => cart.productId !== actions.payload
            );
        },
        increment: (state, actions: PayloadAction<{ productId: number }>) => {
            state.carts = state.carts.map((cart) => {
                return cart.productId === actions.payload.productId
                    ? { ...cart, quantity: cart.quantity + 1 }
                    : cart;
            });
        },
        decrement: (state, actions: PayloadAction<{ productId: number }>) => {
            state.carts = state.carts.map((cart) => {
                return cart.productId === actions.payload.productId
                    ? cart.quantity > 1
                        ? { ...cart, quantity: cart.quantity - 1 }
                        : { ...cart, quantity: 1 }
                    : cart;
            });
        },
    },
});

export const { addCart, removeCartItem, increment, decrement } =
    cartSlice.actions;
export default cartSlice.reducer;
