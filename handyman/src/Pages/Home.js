import React, { useEffect, useState } from "react";
import { Card, CardGroup, CardTitle, CardText, Container, Row, Form, Col } from "react-bootstrap";
import TextAreaInput from "../components/IntputTextArea.component";
import CategoryComponent from "../components/Category.component"
import apiService from "../services/apiFetchService";

function Home() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        apiService.get("categories?top=5")
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div>

            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <div >
                    <Card>
                        <Card.Body>
                            <h1 className="text-center">Agenda tu ayuda confiable para cualquier tarea</h1>
                        </Card.Body>
                        <Card.Text>

                            <div className="row d-flex flex-column justify-content-center align-items-center vh-30">
                                <div className="col-10">
                                    <TextAreaInput placeholder="En que te podemos ayudar?"></TextAreaInput>
                                </div>
                            </div>

                            <br></br>
                            <br />
                            <br />
                            <br />
                            <div className="d-flex justify-content-center align-items-center vh-50">
                                {
                                    items.map((e, i) => (
                                        <CategoryComponent name={e.description} icon={e.icon}></CategoryComponent>
                                    ))
                                }
                            </div>
                        </Card.Text>
                    </Card>
                </div>




            </div>


        </div>
    );
}

export default Home;