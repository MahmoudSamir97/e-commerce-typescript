import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import HeaderLeftBar from "@components/ecommerce/headerLeftBar/HeaderLeftBar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogout } from "@store/features/auth/authSlice";
import { useEffect } from "react";
import actGetWishlist from "@store/features/wishlist/actions/actGetWishlist";

const Header = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("productsId"));
    }
  }, [dispatch, accessToken]);

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
              <HeaderLeftBar />

              {accessToken ? (
                <NavDropdown title={`Hi: ${user?.firstName}`}>
                  <NavDropdown.Item as={NavLink} to={"/profile"}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/"}
                    onClick={() => dispatch(actAuthLogout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
