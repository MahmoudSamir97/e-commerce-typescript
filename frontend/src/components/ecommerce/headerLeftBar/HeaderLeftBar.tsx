import { useAppSelector } from "@store/hooks";
import { getTotalCartQuantitiesSelector } from "@store/features/cart/selectors";
import CartIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import HeaderCounter from "./headerCounter/HeaderCounter";
const HeaderLeftBar = () => {
  const cartTotalQantities = useAppSelector(getTotalCartQuantitiesSelector);
  const wishlistTotalQantities = useAppSelector(
    (state) => state.whishlist.itemsId.length
  );
  return (
    <>
      <HeaderCounter
        to="/wishlist"
        title="Wishlist"
        totalQuantities={wishlistTotalQantities}
        svgIcon={<WishlistIcon />}
      />
      <HeaderCounter
        to="/cart"
        title="Cart"
        totalQuantities={cartTotalQantities}
        svgIcon={<CartIcon />}
      />
    </>
  );
};

export default HeaderLeftBar;
