import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import apiService from "../Services/ApiFetchService";
import ResponseApi from "../Models/ResponseApi";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.post<ResponseApi>("Login/signup", {
        firstName,
        lastName,
        phoneNumber1: phoneNumber,
        documentId,
        email,
        password,
      });

      if (!response.isSuccess) {
        setError(response.message || "No se pudo crear la cuenta.");
        return;
      }

      navigate("/", { state: { signupSuccess: true } });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? `Error al crear la cuenta: ${submitError.message}`
          : "Ocurrió un error al crear la cuenta."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 py-4">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col md={6} lg={5}>
          <Card>
            <Card.Body>
              <h3>Crear cuenta</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    maxLength={50}
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    required
                    maxLength={50}
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    required
                    maxLength={50}
                    type="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>DPI / CUI</Form.Label>
                  <Form.Control
                    required
                    maxLength={255}
                    value={documentId}
                    onChange={(event) => setDocumentId(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    required
                    maxLength={150}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    required
                    minLength={8}
                    maxLength={100}
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    required
                    minLength={8}
                    maxLength={100}
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
                <p className="mt-3 mb-0 text-center">
                  ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
