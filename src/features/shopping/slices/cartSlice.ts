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
        },
        updateCart: (state, action:PayloadAction<{id: number; type: "INC" | "DEC"}>) => {
            const updateProduct = state.cartItems.find((product) => product.id === action.payload.id);
            if(!updateProduct) return;
            
            if(updateProduct) {
                if(action.payload.type === "INC"){
                    updateProduct.quantity++
                }else if(action.payload.type === "DEC"){
                    updateProduct.quantity--;
                    if(updateProduct.quantity < 1){
                        state.cartItems = state.cartItems.filter((product) => product.id !== action.payload.id);
                    }
                }
            }
            // action.payload.type === "DEC" && updateProduct.quantity > 1
        },
        deleteCartItem: (state, action:PayloadAction<number>) => {
            // state.cartItems = state.cartItems.filter((product) => product.id !== action.payload);
            
            const productIndex = state.cartItems.findIndex((product) => product.id === action.payload);
            if(productIndex !== -1){
                state.cartItems.splice(productIndex, 1);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }   
    }
})

export const {addToCart, updateCart, deleteCartItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;