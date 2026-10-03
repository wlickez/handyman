import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiFetchService";

function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        apiService.post("Login/login", { email: usuario, password: password })
            .then(data => {
                if (data.isSuccess){
                    localStorage.setItem("token", data.token);
                    navigate("/home");
                }
                else {
                    window.alert("Error al iniciar sesión: " + data.message);
                }
            })
            .catch(error => {
                window.alert("Error al iniciar sesión: " + error.message);
            });
    };

    return (
        <Container fluid className="vh-100">
            <Row className="h-100 justify-content-center align-items-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <h3 className="text-center mb-4">
                                Iniciar Sesión
                            </h3>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su usuario"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese su contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                >
                                    Ingresar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;