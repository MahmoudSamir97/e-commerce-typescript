import { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v2/category/get-categories"
      );
      const data: TResponse = response.data.categories;
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

export default actGetCategories;
