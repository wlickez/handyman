import { Col, Container, Row } from "react-bootstrap";
import TextAreaInput from "../../Components/TextAreaInputComponent";
import { SetStateAction, useEffect, useState } from "react";
import Category from "../../Models/Category";
import apiService from "../../Services/ApiFetchService";
import OperationButtons from "../../Components/OperationButtonsComponent";
import CardComponent from "../../Components/CardComponent";

function Categories() {

  const [items, setItems] = useState<Category[]>([]);
  const [search, setSearchTerm] = useState("");

  useEffect(() => {
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
          <Col className="d-flex align-items-start"><OperationButtons id= {0} page="categories" option="Crear" /></Col>
        </Row>
      </Container>

      <Row>
        {
          filteredItems.map((e, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                key={e.id}
                id={e.id}
                icon={e.icon}
                description={e.description}
                page="categories"
                option="Editar" />

            </Col>
          ))
        }
      </Row>
    </>
  );
}

export default Categories;