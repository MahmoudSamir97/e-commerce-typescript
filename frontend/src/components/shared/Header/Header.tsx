import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { HeaderBasket } from "../../ecommerce";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
        bg="dak"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <Badge bg="info">
              <span>my</span> Fav
            </Badge>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About Us
              </Nav.Link>
            </Nav>
            <Nav>
              <HeaderBasket />
              <Nav.Link as={NavLink} to="login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
