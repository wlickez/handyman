import React from "react";
import { Card, CardGroup, CardTitle, CardText, Container, Row, Form, Col } from "react-bootstrap";
import TextAreaInput from "../components/IntputTextArea.component";
import CategoryComponent from "../components/Category.component"
import { BsAlignCenter } from "react-icons/bs";
function Home() {
    const items = ["Apple", "Banana", "Orange", "Platano", "Cereza"];
    return (
        <div >
            {/* <div className="d-flex flex-column justify-content-center align-items-center vh-100"> */}
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <div className="col-8">
                    <h3>Agenda tu ayuda confiable para cualquier tarea</h3>
                    <TextAreaInput></TextAreaInput>
                    <div className="col-8 d-flex justify-content-center align-items-center vh-50">
                        {
                            items.map((e, i) => (
                                <CategoryComponent name={e} icon="https://img.icons8.com/?size=100&id=DuuipuI9mFC8&format=png&color=000000"></CategoryComponent>
                            ))
                        }
                    </div>
                </div>               

            </div>
        </div>
    );
}

export default Home;