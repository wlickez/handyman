import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const TextAreaInput = () => {
  const [text, setText] = useState("");

  const handleClick = () => {
    console.log("Text:", text);
  };

  return (
    <Form>
      <InputGroup className="mb-5">
      <Form.Control
        as="text"
        placeholder="En que te podemos ayudar?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ height: "100px" }}
      />
      <Button variant="primary" onClick={handleClick} color="black">
        <FaSearch size={50}>Buscar</FaSearch>
      </Button>
    </InputGroup>
    </Form>
  );
};

export default TextAreaInput;