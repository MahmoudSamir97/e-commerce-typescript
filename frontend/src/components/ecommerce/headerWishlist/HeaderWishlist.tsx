import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import Logo from "@assets/svg/wishlist.svg?react";
import { debounce } from "src/utils/debounce";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate } = styles;

const HeaderWishlist = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQantities = useAppSelector((state) => state.whishlist.itemsId);
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
    <div className={container} onClick={() => navigate("/wishlist")}>
      <Logo />
      {totalQantities.length > 0 && (
        <div className={quantityStyle}>
          <p> {totalQantities.length}</p>
        </div>
      )}
    </div>
  );
};

export default HeaderWishlist;
