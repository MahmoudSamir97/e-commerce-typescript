import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { memo } from "react";
const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemProps = TProduct & {
  changeQuantityHandler: (id: string, quantity: number) => void;
  removeItemHandler: (id: string) => void;
};

const CartItem = memo(
  ({
    title,
    _id,
    price,
    img,
    max,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: TCartItemProps) => {
    const options = Array(max)
      .fill(0)
      .map((_, idx) => {
        const val = ++idx;
        return (
          <option key={val} value={val}>
            {val}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = Number(event.target.value);

      changeQuantityHandler(_id, quantity);
    };
    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price.toFixed(2)} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemHandler(_id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {options}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
