import { memo, useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/features/cart/cartSlice";
import { debounce } from "src/utils/debounce";
const { product, productImg, maximiumNotice } = styles;

const Product = memo(({ img, title, price, id, max, quantity }: TProduct) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const remainingQuantity = max - (quantity ?? 0);

  const quantityReachedToMax = remainingQuantity ? false : true;

  const debounceResetButton = useCallback(
    debounce(() => setIsBtnDisabled(false), 300),
    []
  );

  useEffect(() => {
    if (!isBtnDisabled) return;

    debounceResetButton();
  }, [isBtnDisabled, debounceResetButton]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2 title={title}>{title}</h2>
      <h3>{price} EGP</h3>
      <p className={maximiumNotice}>
        {quantityReachedToMax
          ? "You reached the limit!"
          : `You can add ${remainingQuantity} item(s) `}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? (
          <>
            <Spinner
              animation="border"
              size="sm"
              style={{ marginRight: "0.4rem" }}
            />
            Loadng...
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
