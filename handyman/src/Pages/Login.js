// pages/Login.jsx
import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = () => {

    // Aquí validarías usuario y contraseña
    const loginCorrecto = true;

    
  };

  return (
    <div>
      <h1>Login</h1>
      <InputGroup>
        <Form.Control
          placeholder= "Usuario"
          aria-label="Usuario"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Form.Control
         placeholder= "Contraseña"
          aria-label="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="btn primary">Iniciar Sesión
        </Button>
      </InputGroup>
    </div>
  );
}

export default Login;