import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/categories/actions/actGetCategories";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!records.length) dispatch(actGetCategories());
  }, [dispatch]);

  const categoriesList = records.length
    ? records.map((record) => {
        return (
          <Col
            xs={6}
            md={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Category {...record} />
          </Col>
        );
      })
    : "there is no data";

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default Categories;
