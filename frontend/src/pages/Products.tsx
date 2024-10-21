import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Product } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsByCatPrefix from "@store/features/products/actions/actGetProductsByCatPrefix";
import { productsCleanup } from "@store/features/products/productsSlice";
import Loading from "@components/feedback/loading/Loading";
import { GridList, Heading } from "@components/index";

const Products = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { loading, records, error } = useAppSelector((state) => state.products);

  const productsAllInfo = records.map((record) => {
    return { ...record, quantity: cartItems[record._id] };
  });

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanup());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Heading>{params.prefix} Products</Heading>
      <Loading error={error} status={loading}>
        <GridList
          records={productsAllInfo}
          renderItems={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
