import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";
import { Footer, Header } from "@components/index";

const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
