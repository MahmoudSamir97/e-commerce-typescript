import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems } from "@store/store";
import {
  cartItemChangeQuantity,
  removeFromCart,
  cleanUpProductsFullInfo,
} from "@store/features/cart/cartSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { error, loading, productsFullInfo, items } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      dispatch(cleanUpProductsFullInfo());
      promise.abort();
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el._id],
  }));

  const changeQuantityHandler = useCallback(
    (id: string, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: string) => {
      dispatch(removeFromCart({ id }));
    },
    [dispatch]
  );
  return { error, loading, changeQuantityHandler, removeItemHandler, products };
};

export default useCart;
