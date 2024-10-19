import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsByCatPrefix from "@store/features/products/actions/actGetProductsByCatPrefix";
import { productsCleanup } from "@store/features/products/productsSlice";

const Products = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { loading, records, error } = useAppSelector((state) => state.products);

  const productsList = records.length
    ? records.map((record) => {
        return (
          <Col
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Product {...record} />
          </Col>
        );
      })
    : "there is no data";

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanup());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
  );
};

export default Products;
