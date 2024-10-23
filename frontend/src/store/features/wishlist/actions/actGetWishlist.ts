import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      const response = await axios.get("/wishlist/get-all/sfasdf455");
      const wishlists = response.data.wishlists;
      console.log(wishlists, "wishlists");
      if (!wishlists.length) fulfillWithValue([]);
      return wishlists;
    } catch (error) {
      if (isAxiosError(error)) {
        rejectWithValue(error.response?.data.message);
      } else {
        rejectWithValue("An expected Error!");
      }
    }
  }
);

export default actGetWishlist;
