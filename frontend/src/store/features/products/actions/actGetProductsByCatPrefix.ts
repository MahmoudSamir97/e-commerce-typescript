import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v2/products?cat_prefix=${prefix}`
      );
      const data: TResponse = response.data.products;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        return rejectWithValue(error.response?.data.message);
      } else {
        console.log(error);

        return rejectWithValue("Un Expected error happened");
      }
    }
  }
);

export default actGetProductsByCatPrefix;
