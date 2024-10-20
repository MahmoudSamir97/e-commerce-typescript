import { TProduct } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
};

const initialState: TInitialState = {
  items: {},
  productsFullInfo: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
