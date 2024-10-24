import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./actions/actGetCategories";
import { TLoading, TCategory, isString } from "@types";

interface ICategoriesInterface {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesInterface = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpCategoriesRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });

    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      // typescript guard
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanUpCategoriesRecords } = categoriesSlice.actions;
export default categoriesSlice.reducer;
