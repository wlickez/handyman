using HandyMan.API.Models.Helpers;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HandyMan.API.Interfaces
{
    public interface IDBService<T>
    {
        IDbTransaction IniciarTransaccion(IsolationLevel isolationLevel, string transactionName = null);
        Task<IEnumerable<T>> SelectEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null);
        Task<string> InsertEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null);

        Task<string> UpdateEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null);
        Task AgregarParametros(SqlCommand comando, List<ParametroSql> parametros);
    }
}
