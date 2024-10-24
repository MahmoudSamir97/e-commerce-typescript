import { TProduct } from "@types";
import styles from "./styles.module.css";
const { container } = styles;

type TCartSubtotalPriceProps = {
  products: TProduct[];
};
const CartSubtotalPrice = ({ products }: TCartSubtotalPriceProps) => {
  const total = products.reduce((accumulator, current) => {
    if (current.quantity) {
      return current.price * current.quantity + accumulator;
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <div className={container}>
      <span>Subtotal : </span>
      <span>{total.toFixed(2)}</span>
    </div>
  );
};

export default CartSubtotalPrice;
