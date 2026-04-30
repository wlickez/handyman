import { Card, Image } from "react-bootstrap";

const CategoryComponent = ({ name, icon }) => {
    return (
        <div className="m-3">
            <Card>
                <Card.Img variant="top" src={icon}></Card.Img>
                <Card.Body>
                    <Card.Text>{name}</Card.Text>
                </Card.Body>
            </Card>
            {/* <Image src={ico} alt={name} thumbnail></Image>
            <br></br>
            <label>{name}</label> */}
        </div>
    );
}

export default CategoryComponent;