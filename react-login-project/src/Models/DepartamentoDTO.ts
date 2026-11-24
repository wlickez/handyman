export default class DepartamentoDTO {
  idDepartamento: string;
  codigo: string;
  nombre: string;

  constructor(idDepartamento: string, codigo: string, nombre: string) {
    this.idDepartamento = idDepartamento;
    this.codigo = codigo;
    this.nombre = nombre;
  }
}
