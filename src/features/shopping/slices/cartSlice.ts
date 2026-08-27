import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import type { ProductTypes } from "../types/shopping.types";

interface CartItemTypes extends ProductTypes{
    quantity: number;
    color: string;
}

export interface CartStateTypes {
    cartItems: CartItemTypes[]
}

const initialState:CartStateTypes ={
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<CartItemTypes>) => {
            const existingProduct = state.cartItems.find((product) => product.id === action.payload.id);
            if(!existingProduct){
                state.cartItems.push(action.payload)
            }else{
                existingProduct.quantity += action.payload.quantity;
                existingProduct.color = action.payload.color
            }
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;