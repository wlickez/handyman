import { SetStateAction, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import apiService from "../Services/ApiFetchService";
import TextAreaInput from "../Components/TextAreaInputComponent";
import Service from "../Models/Service";
import OperationButtons from "../Components/OperationButtonsComponent";

function Services() {
    const [items, setItems] = useState<Service[]>([]);
    const [search, setSearchTerm] = useState("");

    useEffect(() => {
        apiService.get<{ isSuccess: boolean; result: Service[]; message: string }>("services?top=50")
            .then(data => {
                if (data.isSuccess && data.result.length > 0)
                {
                    setItems(data.result);
                }
                else{
                    console.info("No data");
                }
            })
            .catch(error => console.log(error));
    }, []);

    const handleSearch = (e: SetStateAction<string>) => {
        setSearchTerm(e);
    };

    const filteredItems = items.filter((item) => {
        {
            console.log("Search", search);
            console.log("Search", item.description);
            return item.description.toLowerCase().includes(search.toLowerCase())
        }
    });

    return (
        <>
            <h2 className="text-center">Nuestros servicios</h2>
            <Container>
                <Row>
                    <Col></Col>
                    <Col><TextAreaInput placeholder="Buscas algún servicio en especial?" onChange={handleSearch}></TextAreaInput></Col>
                    <Col className="d-flex align-items-start"><OperationButtons page="services" /></Col>
                </Row>
            </Container>
            <Row>

                {
                    filteredItems.map((e, i) => (
                        <Col key={i} xs={12} sm={6} md={4} lg={3}>
                            <Card style={{ width: '18rem', padding: "10px", margin: "10px" }}>
                                <Card.Img variant="bottom" style={{ height: "150px", objectFit: "contain" }}></Card.Img>
                                <Card.Body>
                                    <Card.Title>{e.description}</Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </>

    );
}

export default Services;