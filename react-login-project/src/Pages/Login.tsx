import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import apiService from "../Services/ApiFetchService";
import ResponseApi from "../Models/ResponseApi";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const signupSuccess = (location.state as { signupSuccess?: boolean } | null)?.signupSuccess;
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
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Card.Body>
              <h3>Iniciar Sesión</h3>
              {signupSuccess && (
                <Alert variant="success">Tu cuenta fue creada. Ya puedes iniciar sesión.</Alert>
              )}
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
                <p className="mt-3 mb-0 text-center">
                  ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}