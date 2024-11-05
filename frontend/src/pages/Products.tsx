import Loading from "@components/feedback/loading/Loading";
import { Product } from "@components/ecommerce";
import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/index";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { productPrefix, productsAllInfo, loading, error } = useProducts();

  return (
    <Container>
      <Heading title={`${productPrefix} Products`} />
      <Loading error={error} status={loading} type="product">
        <GridList
          emptyMessage="There are no products!"
          records={productsAllInfo}
          renderItems={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
