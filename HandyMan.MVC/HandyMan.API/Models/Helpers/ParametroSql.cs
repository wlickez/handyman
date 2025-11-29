namespace HandyMan.API.Models.Helpers
{
    public class ParametroSql
    {
        public ParametroSql(string nombre, object valor)
        {
            Nombre = !nombre.Contains("@") ? string.Concat("@", nombre) : nombre;
            Valor = valor;
        }

        public ParametroSql(string nombre, object valor, bool isOutput)
        {
            Nombre = !nombre.Contains("@") ? string.Concat("@", nombre) : nombre;
            Valor = valor;
            IsOutput = isOutput;
        }


        public string Nombre { get; set; }
        public Object Valor { get; set; }
        public bool IsOutput { get; set; }
    }
}
