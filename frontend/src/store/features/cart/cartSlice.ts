import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import { actGetProductsByItems } from "@store/store";

type TInitialState = {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
};

const initialState: TInitialState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
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
    productsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload.id];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el._id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const {
  addToCart,
  cartItemChangeQuantity,
  removeFromCart,
  productsFullInfoCleanUp,
} = cartSlice.actions;
export default cartSlice.reducer;
