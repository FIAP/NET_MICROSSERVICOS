using Npgsql;
using System.Data;

namespace Data.Config
{
    public static class PostgreSqlConnectionRepository
    {
        public static string _connectionString;

        public static IDbConnection GetConnection()
        {
            NpgsqlConnection connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            return connection;
        }
    }
}

