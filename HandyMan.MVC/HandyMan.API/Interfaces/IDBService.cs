using HandyMan.API.Models.Helpers;
using Microsoft.Data.SqlClient;
using System.Data;

namespace HandyMan.API.Interfaces
{
    public interface IDBService<T>
    {
        IDbTransaction IniciarTransaccion(IsolationLevel isolationLevel, string transactionName = null);
        Task<IEnumerable<T>> SelectEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null);
        Task<int> InsertEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null);

        Task<int> UpdateEntity(string sqlString, T entity);
        Task AgregarParametros(SqlCommand comando, List<ParametroSql> parametros);
    }
}
