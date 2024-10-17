import Logo from "@assets/svg/cart.svg?react";
import stylesTwo from "./styles.module.css";

const { basketContainer, basketQuantity } = stylesTwo;

const HeaderBasket = () => {
  return (
    <div className={basketContainer}>
      <Logo />
      <div className={basketQuantity}>0</div>
    </div>
  );
};

export default HeaderBasket;
