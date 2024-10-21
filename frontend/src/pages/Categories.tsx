import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Category } from "@components/ecommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/features/categories/actions/actGetCategories";
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/index";

const Categories = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!records.length) dispatch(actGetCategories());
  }, [dispatch, records.length]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItems={(record) => <Category key={record._id} {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
