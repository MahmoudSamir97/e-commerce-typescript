import { TProduct } from "@customTypes/product.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "@services/axios/axios-global";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";

type TDataType = "productsFullInfo" | "productsId";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const trimmedUserId = auth.user?._id.trim();

      const response = await axiosPrivate.get(
        `/wishlist/get-all/${trimmedUserId}`,
        {
          signal,
        }
      );
      const wishlist = response.data.wishlist.productIds;

      if (!wishlist.length) fulfillWithValue([]);

      if (dataType === "productsFullInfo") {
        return { data: wishlist, dataType: "productsFullInfo" };
      } else {
        const concatenatedItemsId = wishlist.map((el: TProduct) => el._id);
        return { data: concatenatedItemsId, dataType: "productsId" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
