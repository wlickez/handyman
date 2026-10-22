import { useEffect, useState, type FormEvent } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../Services/ApiFetchService";
import type Category from "../Models/Category";
import ResponseApi from "../Models/ResponseApi";

type NewRecordPage = "categories" | "services" | "providers";

type NewRecordFormProps = {
  page: NewRecordPage;
};

const titles: Record<NewRecordPage, string> = {
  categories: "Nueva categoría",
  services: "Nuevo servicio",
  providers: "Nuevo proveedor",
};

export default function NewRecordForm({ page }: NewRecordFormProps) {
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [nit, setNit] = useState("CF");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (page !== "services") return;

    apiService.get<Category[]>("categories?top=50")
      .then(setCategories)
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar las categorías.");
      });
  }, [page]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const endpointByPage: Record<NewRecordPage, string> = {
      categories: "categories",
      services: "services",
      providers: "providers",
    };

    const bodyByPage = {
      categories: { description: description.trim(), icon: icon.trim() },
      services: { description: description.trim(), taskCategoryId: Number(categoryId) },
      providers: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber1: phoneNumber1.trim(),
        phoneNumber2: phoneNumber2.trim(),
        documentId: documentId.trim(),
        nit: nit.trim(),
        email: email.trim(),
      },
    };

    try {
      const response = await apiService.post<ResponseApi>(
        endpointByPage[page],
        bodyByPage[page]
      );

      if (!response.isSuccess) {
        setError(response.message || "No se pudo guardar el registro.");
        return;
      }

      navigate(page === "categories" ? "/categorias" : page === "services" ? "/servicios" : "/home");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? `Error al guardar: ${submitError.message}`
          : "Ocurrió un error al guardar el registro."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2>{titles[page]}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                {page === "categories" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        required
                        maxLength={255}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Icono (URL)</Form.Label>
                      <Form.Control
                        required
                        type="url"
                        maxLength={300}
                        value={icon}
                        onChange={(event) => setIcon(event.target.value)}
                      />
                    </Form.Group>
                  </>
                )}

                {page === "services" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        required
                        maxLength={255}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        required
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                      >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.description}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                )}

                {page === "providers" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control required maxLength={255} value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control required maxLength={255} value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono principal</Form.Label>
                      <Form.Control required maxLength={50} type="tel" value={phoneNumber1} onChange={(event) => setPhoneNumber1(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono secundario</Form.Label>
                      <Form.Control maxLength={50} type="tel" value={phoneNumber2} onChange={(event) => setPhoneNumber2(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>DPI / CUI</Form.Label>
                      <Form.Control required maxLength={50} value={documentId} onChange={(event) => setDocumentId(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>NIT</Form.Label>
                      <Form.Control required maxLength={50} value={nit} onChange={(event) => setNit(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control required maxLength={150} type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Form.Group>
                  </>
                )}

                <div className="d-flex gap-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </Button>
                  <Link
                    className="btn btn-secondary"
                    to={page === "categories" ? "/categorias" : page === "services" ? "/servicios" : "/home"}
                  >
                    Cancelar
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
