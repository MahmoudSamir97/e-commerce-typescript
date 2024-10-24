import Loading from "@components/feedback/loading/Loading";
import { CartItemList } from "@components/ecommerce";
import { CartSubtotalPrice, Heading } from "@components/index";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { error, loading, changeQuantityHandler, removeItemHandler, products } =
    useCart();
  return (
    <div>
      <Heading title="Cart" />
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
