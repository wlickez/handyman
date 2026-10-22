import { Card, Col, Container, Row } from "react-bootstrap";
import TextAreaInput from "../Components/TextAreaInputComponent";
import { SetStateAction, useEffect, useState } from "react";
import Category from "../Models/Category";
import apiService from "../Services/ApiFetchService";
import OperationButtons from "../Components/OperationButtonsComponent";

function Categories(){

  const [items, setItems] = useState<Category[]>([]);
  const [search, setSearchTerm] = useState("");

  useEffect(() =>{
    apiService.get<Category[]>("categories?top=50")
      .then(setItems)
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (e: SetStateAction<string>) => {
    setSearchTerm(e);
  };

   const filteredItems = items.filter((item) => {
        {            
            return item.description.toLowerCase().includes(search.toLowerCase())
        }
    });

  return (
    <>
      <h2 className="text-center">Categorías</h2>
      <Container>
        <Row>
          <Col></Col>
          <Col><TextAreaInput placeholder="Buscas alguna categoría en especial?" onChange={handleSearch}></TextAreaInput></Col>
          <Col className="d-flex align-items-start"><OperationButtons page="categories" /></Col>
        </Row>
      </Container>

      <Row>
       {
                    filteredItems.map((e, i) => (
                        <Col key={i} xs={12} sm={6} md={4} lg={3}>
                            <Card style={{ width: '18rem', padding: "10px", margin: "10px" }}>
                                <Card.Img src={e.icon} variant="bottom" style={{ height: "150px", objectFit: "contain" }}></Card.Img>
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

export default Categories;