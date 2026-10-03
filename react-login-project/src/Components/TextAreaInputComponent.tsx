import { SetStateAction, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

type TextAreaInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
};
const TextAreaInput = ({ placeholder, onChange }: TextAreaInputProps) => {
    const [text, setText] = useState("");
    const [handler, setHandler] = useState<(value: string) => void>(() => (value: string) => {
        console.log("Handler", value);
    });

    useEffect(() => {
        if (onChange){
            setHandler(() => onChange);
        }
        else{
            setHandler(() => (value: string) => setText(value));
        }
    }, [onChange]);

    const handleClick = () => {
        console.log("Text", text);
    }

    if (placeholder === "Buscas algún servicio en especial?") 
        placeholder = "Busca algún servicio en especial?";

    return (
        <>
            <InputGroup>
                <Form.Control
                    placeholder={placeholder}
                    aria-label={placeholder}
                    onChange={ (e) => handler(e.target.value)}>

                </Form.Control>
                <Button className="btn btn-primary">
                   

                </Button>
            </InputGroup>
        </>
    );
};

export default TextAreaInput;