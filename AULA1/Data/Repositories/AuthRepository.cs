using Dapper;
using Data.Config;
using Data.Interfaces;

using System.Linq;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        public async Task<Usuario> Login(Usuario user)
        {
            var connection = PostgreSqlConnectionRepository.GetConnection();

            //Precisa criar alguma criptografia
            var query = $@"SELECT Id, Username, Email, UserType 
                        FROM ""User""
                        WHERE Email = '{user.Email}' 
                        AND Password = '{user.Password}';";
            var result = await connection.QueryAsync<Usuario>(query);

            return result.FirstOrDefault();
        }
    }
}
