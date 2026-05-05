import { Card, Image } from "react-bootstrap";

const CategoryComponent = ({ name, icon }) => {
    return (
        <div className="m-3">
            <Card style={{width: "130px"}}> 
                <a href="https://example.com" target="_blank" rel="noreferrer">
                    <Card.Img variant="bottom" src={icon} style={{ height: "80px", objectFit: "contain" }}></Card.Img>
                </a>
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