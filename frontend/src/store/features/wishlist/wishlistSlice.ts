import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./actions/actLikeToggle";
import { isString, TLoading, TProduct } from "@types";
import actGetWishlist from "./actions/actGetWishlist";

type TInitialState = {
  itemsId: string[];
  productsFullInfo: TProduct[];
  error: string | null;
  loading: TLoading;
};

const initialState: TInitialState = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};

const whishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanUpWishlistProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload?.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter(
          (item) => item !== action.payload?.id
        );
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el._id !== action.payload?.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get wishlists
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanUpWishlistProductsFullInfo } = whishlistSlice.actions;
export default whishlistSlice.reducer;
