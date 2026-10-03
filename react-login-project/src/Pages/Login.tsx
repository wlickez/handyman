import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import apiService from "../Services/ApiFetchService";
import ResponseApi from "../Models/ResponseApi";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    apiService.post<ResponseApi>("Login/login", { email: usuario, password: password })
        .then(data => {
            if (data.isSuccess) {
                localStorage.setItem("token", data.result[0]);
                navigate("/home");
            }
        })
        .catch(error => {
            window.alert("Error al iniciar sesión: " + error.message);
        })
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3>Iniciar Sesión</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    value={usuario}
                    onChange={(event) => setUsuario(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="w-100">
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