import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardText, CardTitle, Row, Col, Container } from 'react-bootstrap'
import apiService from "../services/apiFetchService";
import CategoryComponent from "../components/Category.component";
import TextAreaInput from "../components/IntputTextArea.component";

function Services() {

    const [items, setItems] = useState([]);
    const [search, setSearchTerm] = useState("");

    useEffect(() => {
        apiService.get("categories?top=50")
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleSearch = (e) => {
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
                    <Col></Col>
                </Row>
            </Container>
            <Row>

                {
                    filteredItems.map((e, i) => (
                        <Col key={i} xs={12} sm={6} md={4} lg={3}>
                            <Card style={{ width: '18rem', padding: "10px", margin: "10px" }}>
                                <Card.Img variant="bottom" src={e.icon} style={{ height: "150px", objectFit: "contain" }}></Card.Img>
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