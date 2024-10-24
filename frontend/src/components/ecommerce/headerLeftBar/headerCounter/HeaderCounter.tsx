import { useEffect, useState } from "react";
// import { debounce } from "src/utils/debounce";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { debounce } from "@utils";

const { container, totalNum, pumpAnimate, wishlistContainer, wishlist, cart } =
  styles;

type THeaderCounterProps = {
  totalQuantities: number;
  svgIcon: React.ReactNode;
  to: string;
  title: string;
};

const HeaderCounter = ({
  totalQuantities,
  svgIcon,
  to,
  title,
}: THeaderCounterProps) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQuantities) return;
    setIsAnimate(true);
    // change for long time !
    const debouncedAnimation = debounce(() => setIsAnimate(false), 300);

    debouncedAnimation();
  }, [totalQuantities]);

  return (
    <div
      className={`${container} ${
        title === "Wishlist" ? wishlistContainer : " "
      }`}
      onClick={() => navigate(to)}
    >
      {svgIcon}
      {totalQuantities > 0 && (
        <div
          className={`${quantityStyle} ${
            title === "Wishlist" ? wishlist : cart
          }`}
        >
          <p> {totalQuantities}</p>
        </div>
      )}
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
