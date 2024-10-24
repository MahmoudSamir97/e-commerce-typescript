import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TProduct } from "@types";
import actGetProductsByCatPrefix from "./actions/actGetProductsByCatPrefix";

interface ICategoriesInterface {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesInterface = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanupProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });

    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanupProductsRecords } = productsSlice.actions;
export default productsSlice.reducer;
