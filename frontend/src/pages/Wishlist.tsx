import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetWishlist from "@store/features/wishlist/actions/actGetWishlist";
import { GridList, Heading } from "@components/index";
import Loading from "@components/feedback/loading/Loading";
import { Product } from "@components/ecommerce";
import { productsFullInfoCleanUp } from "@store/features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { loading, productsFullInfo, error } = useAppSelector(
    (state) => state.whishlist
  );
  console.log(productsFullInfo, "productsFullInfo");
  // const wishlistItemsId = useAppSelector((state) => state.whishlist.itemsId);

  const records = productsFullInfo.map((el) => {
    return {
      ...el,
      quantity: cartItems[el._id],
      isLiked: true,
    };
  });

  console.log(records, "records");

  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(productsFullInfoCleanUp());
    };
  }, [dispatch]);
  return (
    <>
      <Heading>Your Wishlist </Heading>
      <Loading error={error} status={loading}>
        <GridList
          records={records}
          renderItems={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
