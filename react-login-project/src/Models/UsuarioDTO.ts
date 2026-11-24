import { UUID } from "crypto";

export default class UsuarioDTO {
    idUsuario: UUID;
    nombres: string;
    apellidos: string;
    correo: string;

    constructor(idUsuario: UUID, nombres: string, apellidos: string, correo: string){
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
    }
}