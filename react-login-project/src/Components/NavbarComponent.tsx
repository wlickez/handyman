import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const n = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Handyman</Navbar.Brand>
        <Nav className="me-autod-flex align-items-center gap-2">
          <Nav.Link as={Link} to="/categorias">
            Categorías
          </Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/servicios">
            Servicios
          </Nav.Link>
        </Nav>
        <Button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            n("/");
          }}
        >
          Salir
        </Button>
      </Container>
    </Navbar>
  );
}