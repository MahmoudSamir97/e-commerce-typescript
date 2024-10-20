import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`/products?cat_prefix=${prefix}`);

      const data: TResponse = response.data.products.map(
        (product: TProduct) => {
          return {
            id: product._id,
            title: product.title,
            img: product.img,
            cat_prefix: product.cat_prefix,
            price: product.price,
            max: product.max,
          };
        }
      );
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
