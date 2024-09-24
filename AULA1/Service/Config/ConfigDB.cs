using Data.Config;

namespace Service.Config
{
    public static class ConfigDB
    {
        public static void Registry(string connectionString)
        {
             PostgreSqlConnectionRepository._connectionString = connectionString;
        }

    }
}
