import {createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';

const initialState = {
    productList: [],
    cartItems: [] 
}
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItems.some(el => el._id === action.payload._id)
      if (!check) {
        const total = action.payload.price
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, qty: 1, total },
        ];
        toast("Item Added Successfully");
      } else {
        toast("Already Item in Cart")
      }
    },
    deleteCartItem: (state, action) => {
      const index = state.cartItems.findIndex(el => el._id === action.payload)
      state.cartItems.splice(index, 1)
    },
    increaseQty: (state, action) => {
      const index = state.cartItems.findIndex(el => el._id === action.payload)
      state.cartItems[index].qty += 1
      state.cartItems[index].total = state.cartItems[index].price * state.cartItems[index].qty;
    },
    
    decreaseQty: (state, action) => {
      const index = state.cartItems.findIndex(el => el._id === action.payload)
      if (state.cartItems[index].qty > 1)
        state.cartItems[index].qty -= 1
        state.cartItems[index].total = state.cartItems[index].price * state.cartItems[index].qty;
    }

  },
});

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlice.actions;

export default productSlice.reducer