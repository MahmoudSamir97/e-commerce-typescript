import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "@services/axios/axios-global";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (productId: string, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await axiosPrivate.get(
        `/wishlist/get-wishlist/${auth.user?._id}/${productId}`
      );

      const isWishlistExist = response.data.product;

      if (isWishlistExist) {
        await axiosPrivate.delete(
          `/wishlist/delete/${auth.user?._id}/${productId}`
        );

        return { type: "delete", id: productId };
      } else {
        await axiosPrivate.post("/wishlist/add", {
          userId: auth.user?._id,
          productId,
        });

        return { type: "add", id: productId };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
