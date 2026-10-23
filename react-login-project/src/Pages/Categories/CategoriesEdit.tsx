import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import apiService from "../../Services/ApiFetchService";
import Category from "../../Models/Category";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoriesEdit = () => {
    const { id } = useParams<{ id: string }>();
    const [descripcion, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || !/^\d+$/.test(id)) {
            setError("El identificador de la categoría no es válido.");
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        setIsLoading(true);
        setIsCategoryLoaded(false);
        setError("");

        apiService.get<Category[]>(`categories/byId?id=${encodeURIComponent(id)}`)
            .then(categories => {
                if (!isMounted) return;

                const category = categories[0];
                if (!category) {
                    setError("No se encontró la categoría solicitada.");
                    return;
                }

                setDescription(category.description);
                setIcon(category.icon);
                setIsCategoryLoaded(true);
            })
            .catch(loadError => {
                if (isMounted) {
                    setError(loadError instanceof Error
                        ? `No se pudo cargar la categoría: ${loadError.message}`
                        : "No se pudo cargar la categoría.");
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if (!id) return;

        setError("");
        setIsSaving(true);
        try {
            const response = await apiService.put<{ isSuccess: boolean; message: string }>(
                `categories/${encodeURIComponent(id)}`,
                { description: descripcion.trim(), icon: icon.trim() }
            );

            if (!response.isSuccess) {
                setError(response.message || "No se pudo actualizar la categoría.");
                return;
            }

            navigate("/categorias");
        } catch (saveError) {
            setError(saveError instanceof Error
                ? `No se pudo actualizar la categoría: ${saveError.message}`
                : "No se pudo actualizar la categoría.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Container className="py-4">
            <Card className="mx-auto" style={{ maxWidth: "36rem" }}>
                <Card.Body>
                    <Card.Title>Editar categoría</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {isLoading ? (
                        <div className="d-flex align-items-center gap-2">
                            <Spinner size="sm" />
                            <span>Cargando categoría...</span>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    required
                                    maxLength={255}
                                    value={descripcion}
                                    onChange={(event) => setDescription(event.target.value)}
                                    disabled={!isCategoryLoaded || isSaving}
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
                                    disabled={!isCategoryLoaded || isSaving}
                                />
                            </Form.Group>
                            <div className="d-flex gap-2">
                                <Button type="submit" disabled={!isCategoryLoaded || isSaving}>
                                    {isSaving ? "Guardando..." : "Guardar cambios"}
                                </Button>
                                <Link className="btn btn-secondary" to="/categorias">
                                    Cancelar
                                </Link>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CategoriesEdit;