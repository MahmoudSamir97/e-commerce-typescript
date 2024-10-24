import { TProduct } from "@types";
import CartItem from "../cartItem/CartItem";

type TCartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: string, quantity: number) => void;
  removeItemHandler: (id: string) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: TCartItemListProps) => {
  const renderItems = products.map((el) => (
    <CartItem
      key={el._id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <>{renderItems}</>;
};

export default CartItemList;
