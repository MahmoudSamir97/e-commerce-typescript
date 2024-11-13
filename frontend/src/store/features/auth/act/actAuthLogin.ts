import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGlobal from "@services/axios/axios-global";
import { axiosErrorHandler } from "@utils";

type TForm = {
  email: string;
  password: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (form: TForm, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const response = await axiosGlobal.post("/auth/login", form);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
