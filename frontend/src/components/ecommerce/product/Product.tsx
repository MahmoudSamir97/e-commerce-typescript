import { memo, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/features/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFilled from "@assets/svg/like-fill.svg?react";
import actLikeToggle from "@store/features/wishlist/actions/actLikeToggle";
const { product, productImg, maximiumNotice, wishlistBtn } = styles;
import { Button, Modal, Spinner } from "react-bootstrap";

const Product = memo(
  ({
    img,
    title,
    price,
    _id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const remainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = remainingQuantity ? false : true;

    useEffect(() => {
      if (!isBtnDisabled) return;

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(_id));
      setIsBtnDisabled(true);
    };

    const actLikeToggleHandler = () => {
      if (loading) return;
      if (isAuthenticated) {
        setIsLoading(true);
        dispatch(actLikeToggle(_id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You have to login first to add this item to your wishlist!
          </Modal.Body>
        </Modal>

        <div className={product}>
          <div className={wishlistBtn} onClick={actLikeToggleHandler}>
            {loading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFilled />
            ) : (
              <Like />
            )}
          </div>
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
      </>
    );
  }
);

export default Product;
