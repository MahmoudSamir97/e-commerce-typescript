import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/shared";
import actGetProductsByCatPrefix from "./actions/actGetProductsByCatPrefix";
import { TProduct } from "@customTypes/product";

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
    productsCleanup: (state) => {
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
      //   casting
      state.error = action.payload as string;
      state.loading = "failed";

      //   if (action.payload && typeof action.payload === "string") {
      //     state.error = action.payload;
      //   }
    });
  },
});

export const { productsCleanup } = productsSlice.actions;
export default productsSlice.reducer;
