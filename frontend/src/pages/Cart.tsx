import Loading from "@components/feedback/loading/Loading";
import { CartItemList } from "@components/ecommerce";
import { CartSubtotalPrice, Heading, LottieHandler } from "@components/index";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { error, loading, changeQuantityHandler, removeItemHandler, products } =
    useCart();

  return (
    <div>
      <Heading title="Cart" />
      <Loading status={loading} error={error} type="cart">
        <Loading status={loading} error={error} type="cart">
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
            <LottieHandler message="Your cart is empty" type="empty" />
          )}
        </Loading>
      </Loading>
    </div>
  );
};

export default Cart;
