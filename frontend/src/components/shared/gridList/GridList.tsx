import { Col, Row } from "react-bootstrap";

type TGridListProps<T> = {
  records: T[];
  renderItems: (rec: T) => React.ReactNode;
};

type THasId = { _id?: string };

const GridList = <T extends THasId>({
  records,
  renderItems,
}: TGridListProps<T>) => {
  const categoriesList = records.length
    ? records.map((record) => {
        return (
          <Col
            xs={6}
            md={3}
            key={record._id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItems(record)}
          </Col>
        );
      })
    : "there is no data";

  return <Row>{categoriesList}</Row>;
};

export default GridList;
