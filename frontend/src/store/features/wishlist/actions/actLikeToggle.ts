import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

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
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
