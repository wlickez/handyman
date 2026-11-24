import UsuarioDTO from "../UsuarioDTO";

export class Response {
    exito: boolean;
    mensaje: string;
    datos: UsuarioDTO;

    constructor(exito: boolean, mensaje: string, datos: UsuarioDTO)
    {
        this.exito = exito;
        this.mensaje = mensaje;
        this.datos= datos;
    }
}