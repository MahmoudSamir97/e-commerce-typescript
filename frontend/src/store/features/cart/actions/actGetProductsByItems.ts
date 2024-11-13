import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "@services/axios/axios-global";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) return fulfillWithValue([]);
    try {
      const concatenatedItemsId = itemsId.join(",");
      const response = await axiosPrivate.get(
        `/products?id=${concatenatedItemsId}`,
        {
          signal,
        }
      );
      const data = response.data.products;
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
