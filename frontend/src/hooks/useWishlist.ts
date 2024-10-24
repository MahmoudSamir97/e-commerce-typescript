import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetWishlist from "@store/features/wishlist/actions/actGetWishlist";
import { cleanUpWishlistProductsFullInfo } from "@store/features/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { loading, productsFullInfo, error } = useAppSelector(
    (state) => state.whishlist
  );

  const records = productsFullInfo.map((el) => {
    return {
      ...el,
      quantity: cartItems[el._id],
      isLiked: true,
    };
  });

  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      dispatch(cleanUpWishlistProductsFullInfo());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, records };
};

export default useWishlist;
