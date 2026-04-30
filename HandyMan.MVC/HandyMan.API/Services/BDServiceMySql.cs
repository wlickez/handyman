using HandyMan.API.Interfaces;
using HandyMan.API.Models.Helpers;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace HandyMan.API.Services
{
    public class BDServiceMySql<T> : IDBService<T>
    {
        public Task AgregarParametros(SqlCommand comando, List<ParametroSql> parametros)
        {
            throw new NotImplementedException();
        }

        public IDbTransaction IniciarTransaccion(IsolationLevel isolationLevel, string transactionName = null)
        {
            throw new NotImplementedException();
        }

        public Task<string> InsertEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> SelectEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null)
        {
            throw new NotImplementedException();
        }

        public Task<string> UpdateEntity(string sqlString, bool isSP = false, List<ParametroSql>? parametros = null, IDbTransaction? transaction = null)
        {
            throw new NotImplementedException();
        }
    }
}
