import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LottieHandler } from "@components/index";

const Error = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ marginTop: "12rem" }}
    >
      <LottieHandler type="notFound" />
      <Link
        to="/"
        replace={true}
        style={{ textDecoration: "none", fontSize: "1.1rem" }}
      >
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default Error;
