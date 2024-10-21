import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios, { isAxiosError } from "axios";

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    if (!itemsId.length) return fulfillWithValue([]);

    try {
      const concatenatedItemsId = itemsId.join(",");
      const response = await axios.get(`/products?id=${concatenatedItemsId}`);
      const data = response.data.products;
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        rejectWithValue(error.response?.data.message);
      } else {
        rejectWithValue("An expected Error!");
      }
    }
  }
);

export default actGetProductsByItems;
