import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavbarComponent() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Handyman</Navbar.Brand>

                    <Nav className="me-auto">
                        /home
                        Inicio
                        <Nav.Link>

                            /servicios
                            Servicios
                        </Nav.Link>
                    </Nav>

                    <Button variant="outline-light" onClick={logout}>
                        Salir
                    </Button>
                </Container >
            </Navbar >
        </>
    );
}

export default NavbarComponent;