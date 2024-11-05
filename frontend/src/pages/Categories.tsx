import { Container } from "react-bootstrap";
import { Category } from "@components/ecommerce";

import Loading from "@components/feedback/loading/Loading";
import { GridList, Heading } from "@components/index";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <Container>
      <Heading title="Categories" />
      <Loading status={loading} error={error} type="category">
        <GridList
          emptyMessage="There are no categories!"
          records={records}
          renderItems={(record) => <Category key={record._id} {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
