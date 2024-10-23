import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`/wishlist/get-wishlist/dfsdgfrd/${id}`);
      const isWishlistExist = response.data.wishlist;
      if (isWishlistExist) {
        await axios.delete(`/wishlist/delete/561465/${id}`);
        return { type: "delete", id };
      } else {
        await axios.post("/wishlist/add", {
          userId: "dfsdf6d2f",
          productId: id,
        });
        return { type: "add", id };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        rejectWithValue(error.response?.data.message);
      } else {
        rejectWithValue("An expected Error!");
      }
    }
  }
);

export default actLikeToggle;
