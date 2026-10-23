import { Card } from "react-bootstrap";
import OperationButtons from "./OperationButtonsComponent";

interface CardComponentProps {
    id: number,
    icon: string;
    description: string;
    page: string;
    option: string;
}

export default function CardComponent({
    id,
    icon,
    description,
    page,
    option
}: CardComponentProps) {
    return (
        <Card style={{ width: '12rem', padding: "5px", margin: "5px" }}>
            <Card.Img src={icon} variant="bottom" style={{ height: "120px", objectFit: "contain" }}></Card.Img>
            <Card.Body>
                <Card.Title>{description}</Card.Title>
                <Card.Text>
                    <OperationButtons key={id} id={id} page={page} option={option}></OperationButtons>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
