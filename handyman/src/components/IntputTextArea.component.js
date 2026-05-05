import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const TextAreaInput = ({placeholder}) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    console.log("Text:", text);
  };

  if (placeholder == null)
    placeholder = "En que te podemos ayudar?";

  return (
    
    <>
      <InputGroup>
        <Form.Control
          placeholder= {placeholder}
          aria-label="Recipient's username with two button addons"
        />
        <Button className="btn primary">Buscar
          <FaSearch></FaSearch>
        </Button>       
      </InputGroup>
    </>    
  );
};

export default TextAreaInput;