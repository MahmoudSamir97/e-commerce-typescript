import { useCallback, useEffect } from "react";
import { CartSubtotalPrice, Heading } from "@components/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems } from "@store/store";
import Loading from "@components/feedback/loading/Loading";
import { CartItemList } from "@components/ecommerce";
import {
  cartItemChangeQuantity,
  removeFromCart,
  productsFullInfoCleanUp,
} from "@store/features/cart/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { error, loading, productsFullInfo, items } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());
    return () => {
      dispatch(productsFullInfoCleanUp());
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

  return (
    <div>
      <Heading>Cart</Heading>
      <Loading status={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20%",
            }}
          >
            Your Cart Is Empty!
          </p>
        )}
      </Loading>
    </div>
  );
};

export default Cart;
