import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import Logo from "@assets/svg/cart.svg?react";
import { getTotalCartQuantitiesSelector } from "@store/features/cart/selectors";
import { debounce } from "src/utils/debounce";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQantities = useAppSelector(getTotalCartQuantitiesSelector);
  const navigate = useNavigate();

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQantities) return;
    setIsAnimate(true);
    // change for long time !
    const debouncedAnimation = debounce(() => setIsAnimate(false), 300);

    debouncedAnimation();
  }, [totalQantities]);

  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <Logo />
      {totalQantities > 0 && (
        <div className={quantityStyle}>
          <p> {totalQantities}</p>
        </div>
      )}
    </div>
  );
};

export default HeaderBasket;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "@store/hooks";
// import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
// import Logo from "@assets/svg/cart.svg?react";

// import styles from "./styles.module.css";
// const { container, totalNum, pumpAnimate, iconWrapper } = styles;

// const HeaderBasket = () => {
//   const navigate = useNavigate();
//   const [isAnimate, setIsAnimate] = useState(false);
//   const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
//   const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

//   useEffect(() => {
//     if (!totalQuantity) {
//       return;
//     }
//     setIsAnimate(true);

//     const debounce = setTimeout(() => {
//       setIsAnimate(false);
//     }, 300);

//     return () => clearTimeout(debounce);
//   }, [totalQuantity]);

//   return (
//     <div className={container} onClick={() => navigate("/cart")}>
//       <div className={iconWrapper}>
//         <Logo title="basket icon" />
//         {totalQuantity > 0 && (
//           <div className={quantityStyle}>{totalQuantity}</div>
//         )}
//       </div>
//       <h3>Cart</h3>
//     </div>
//   );
// };

// export default HeaderBasket;
