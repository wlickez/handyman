import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const TextAreaInput = ({placeholder, onChange}) => {
  const [text, setText] = useState("");
  const [handler, setHandler] = useState(() => (e) => {
    console.log("Default handler: ", e);
  });

  useEffect(() => {
    if (onChange) {
      setHandler(() => onChange);
    }else {
      setHandler(() => (e) => setText(e));
    }}, [onChange]);

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
          onChange={(e) => handler(e.target.value)}
        />
        <Button className="btn primary">Buscar
          <FaSearch></FaSearch>
        </Button>       
      </InputGroup>
    </>    
  );
};

export default TextAreaInput;