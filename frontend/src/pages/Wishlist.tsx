import { GridList, Heading } from "@components/index";
import Loading from "@components/feedback/loading/Loading";
import { Product } from "@components/ecommerce";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { error, loading, records } = useWishlist();
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading error={error} status={loading}>
        {records.length ? (
          <GridList
            records={records}
            renderItems={(record) => <Product {...record} />}
          />
        ) : (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20%",
            }}
          >
            Your Wishlist Is Empty!
          </p>
        )}
      </Loading>
    </>
  );
};

export default Wishlist;
