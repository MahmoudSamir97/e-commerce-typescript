import Logo from "@assets/svg/cart.svg?react";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { getTotalCartQuantitiesSelector } from "@store/features/cart/selectors";
import { useEffect, useState } from "react";
import { debounce } from "src/utils/debounce";
const { basketContainer, basketQuantity, pumpCartQuantity } = styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQantities = useAppSelector(getTotalCartQuantitiesSelector);

  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

  useEffect(() => {
    if (!totalQantities) return;
    setIsAnimate(true);
    // change for long time !
    const debouncedAnimation = debounce(() => setIsAnimate(false), 300);

    debouncedAnimation();
  }, [totalQantities]);

  return (
    <div className={basketContainer}>
      <Logo />
      <div className={quantityStyle}>{totalQantities}</div>
    </div>
  );
};

export default HeaderBasket;
