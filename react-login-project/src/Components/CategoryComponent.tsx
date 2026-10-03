import { Card } from "react-bootstrap";

type CategoriesProps = {
  name: string;
  icon: string;
};
const CategoryComponent =({name, icon}: CategoriesProps) =>{
  return (
    <div className="m-3">
        <Card style={{width: '130px'}}>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                <Card.Img variant="bottom" src={icon} style={{ height: "80px", objectFit: "contain" }}></Card.Img>
            </a>
            <Card.Body>
                <Card.Text>{name}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}

export default CategoryComponent;