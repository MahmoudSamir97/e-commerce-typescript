import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGlobal from "@services/axios/axios-global";
import { axiosErrorHandler } from "@utils";

const actAuthLogout = createAsyncThunk(
  "auth/actAuthLogout",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      await axiosGlobal.get("/auth/logout");
    } catch (error) {
      rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogout;
