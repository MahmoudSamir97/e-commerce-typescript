import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import Logo from "@assets/svg/cart.svg?react";
import { getTotalCartQuantitiesSelector } from "@store/features/cart/selectors";
import { debounce } from "src/utils/debounce";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const { basketContainer, basketQuantity, pumpCartQuantity } = styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQantities = useAppSelector(getTotalCartQuantitiesSelector);
  const navigate = useNavigate();

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
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <Logo />
      <div className={quantityStyle}>{totalQantities}</div>
    </div>
  );
};

export default HeaderBasket;
