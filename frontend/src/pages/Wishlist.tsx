import { GridList, Heading } from "@components/index";
import Loading from "@components/feedback/loading/Loading";
import { Product } from "@components/ecommerce";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { error, loading, records } = useWishlist();
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading error={error} status={loading} type="product">
        <GridList
          emptyMessage="Your wishlist is empty!"
          records={records}
          renderItems={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
