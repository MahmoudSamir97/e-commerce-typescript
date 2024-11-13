import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@services/axios/axios-global";
import { axiosErrorHandler } from "@utils";

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
      return response.data;
    } catch (error) {
      axiosErrorHandler(rejectWithValue(error));
    }
  }
);

export default actAuthRegister;
