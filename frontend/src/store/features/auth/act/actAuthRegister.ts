import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const response = await axios.post("/auth/register", { ...formData });
      console.log(response, "response");
      return response.data;
    } catch (error) {
      axiosErrorHandler(rejectWithValue(error));
    }
  }
);

export default actAuthRegister;
