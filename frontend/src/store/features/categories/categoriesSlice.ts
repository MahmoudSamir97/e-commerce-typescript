import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./actions/actGetCategories";
import { TLoading } from "@customTypes/shared";
import { TCategory } from "@customTypes/category";

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
  reducers: {},
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
      //   casting
      state.error = action.payload as string;
      state.loading = "failed";

      //   if (action.payload && typeof action.payload === "string") {
      //     state.error = action.payload;
      //   }
    });
  },
});

export default categoriesSlice.reducer;
