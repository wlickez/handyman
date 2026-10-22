import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import newRecordRoutesType from "../Models/NewRecordRoutes.enum";

interface OperationButtonsProps {
    page: keyof typeof newRecordRoutesType;
}

const OperationButtons = ({ page }: OperationButtonsProps, option: string) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(newRecordRoutesType[page]);

    return (
        <Button variant="primary" type="button" onClick={handleClick}>
            Nuevo
        </Button>
    );
};

export default OperationButtons;