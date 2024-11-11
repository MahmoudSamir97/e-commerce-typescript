import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      const response = await axios.post("/auth/login", form);
      return response.data;
      console.log(response, "response");
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
