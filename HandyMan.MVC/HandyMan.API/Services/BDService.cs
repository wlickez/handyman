using Dapper;
using HandyMan.API.Interfaces;
using HandyMan.API.Models.Helpers;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HandyMan.API.Services
{

    public class DBService<T> : IDBService<T>
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public DBService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration["AppSettings:ConnectionString"];
            
        }

        private SqlConnection CrearConexion()
        {
            try
            {
                return new SqlConnection(_connectionString);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task AgregarParametros(SqlCommand comando, List<ParametroSql> parametros)
        {
            if (parametros != null)            
                foreach (ParametroSql p in parametros)
                {
                    SqlParameter parametro = new SqlParameter();
                    if (string.IsNullOrEmpty(Convert.ToString(p.Valor)))
                        parametro.Value = DBNull.Value;
                    else
                        parametro.Value = p.Valor;

                    if (p.IsOutput)
                        parametro.Direction = ParameterDirection.InputOutput;

                    parametro.ParameterName = p.Nombre;
                    comando.Parameters.Add(parametro);
                }             

            await Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> SelectEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null)
        {
            var pars = new DynamicParameters();
            
            if(parametros != null)            
                foreach (var parametro in parametros)                
                    pars.Add(parametro.Nombre, parametro.Valor);

            var connection = CrearConexion();

            return await connection.QueryAsync<T>(sqlString, pars, transaction: transaction, commandType: (isSP) ? CommandType.StoredProcedure : CommandType.Text);
        }

        public async Task<string> InsertEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null)
        {
            try
            {
                var pars = new DynamicParameters();
                if (parametros != null)                
                    foreach (var parametro in parametros)
                        pars.Add(parametro.Nombre, parametro.Valor);

                var connection = CrearConexion();

                int inserted = await connection.ExecuteAsync(sqlString, pars, transaction, commandType: (isSP) ? CommandType.StoredProcedure : CommandType.Text);
                if (inserted == 0)
                    throw new Exception("No se logró realizar la inserción");

                return string.Empty;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> UpdateEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null)
        {
            try
            {
                var pars = new DynamicParameters();
                if (parametros != null)
                    foreach (var parametro in parametros)
                        pars.Add(parametro.Nombre, parametro.Valor);

                var connection = CrearConexion();

                int inserted = await connection.ExecuteAsync(sqlString, pars, transaction, commandType: (isSP) ? CommandType.StoredProcedure : CommandType.Text);
                if (inserted == 0)
                    throw new Exception("No se logró realizar la inserción");

                return string.Empty;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public IDbTransaction IniciarTransaccion(IsolationLevel isolationLevel, string transactionName = null)
        {
            try
            {
                var connection = CrearConexion();
                var transaction = connection.BeginTransaction(isolationLevel);
                return transaction;
            }
            catch (Exception ex)
            {
                return null;
            }
        }      
    }
}
