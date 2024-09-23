using Dapper;
using Data.Config;
using Data.Interfaces;
using Model.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        public async Task<User> Login(User user)
        {
            var connection = PostgreSqlConnectionRepository.GetConnection();

            //Precisa criar alguma criptografia
            var query = $@"SELECT Id, Username, Email, UserType 
                        FROM ""User""
                        WHERE Email = '{user.Email}' 
                        AND Password = '{user.Password}';";
            var result = await connection.QueryAsync<User>(query);

            return result.FirstOrDefault();
        }
    }
}
