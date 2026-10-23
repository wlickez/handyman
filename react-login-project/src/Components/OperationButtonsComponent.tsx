import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface OperationButtonsProps {
    id: number,
    page: string,
    option: string
}

const OperationButtons = ({ id, page, option }: OperationButtonsProps) => {
    const navigate = useNavigate();

    var valor = "";

    if (option === "Crear" || option === "crear"){
        option = "new"
        valor = "Nuevo";
    }
    if (option === "Editar" || option === "editar") {
        option = `edit/${id}`;
        valor = "Editar";
    }
    const handleClick = () => {
        navigate("/" + page + "/" + option);
    }

    var color = "";
    switch (option) {
        case "Guardar":
            color = "primary"
            break;
        case "Editar":
            color = "warning";
            break;
        case "Crear":
            color = "success";
            break;
        default:
            break;
    }

    return (
        <Button variant={color} onClick={handleClick}>
            <i className="bi bi-pencil-fill me-2"></i>
            {valor}
        </Button>
    );
};

export default OperationButtons;