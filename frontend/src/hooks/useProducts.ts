import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsByCatPrefix from "@store/features/products/actions/actGetProductsByCatPrefix";
import { cleanupProductsRecords } from "@store/features/products/productsSlice";

const useProducts = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productPrefix = params.prefix;
  const cartItems = useAppSelector((state) => state.cart.items);
  const { loading, records, error } = useAppSelector((state) => state.products);
  const wishlistItemsId = useAppSelector((state) => state.whishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const productsAllInfo = records.map((el) => {
    return {
      ...el,
      quantity: cartItems[el._id],
      isLiked: wishlistItemsId.includes(el._id),
      isAuthenticated: userAccessToken ? true : false,
    };
  });

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );

    return () => {
      dispatch(cleanupProductsRecords());
      promise.abort();
    };
  }, [dispatch, params]);

  return { loading, productsAllInfo, error, productPrefix };
};

export default useProducts;
