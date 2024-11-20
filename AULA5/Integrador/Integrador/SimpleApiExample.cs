namespace Integrador
{
    public class SimpleApiExample
    {
        private readonly HttpClient _httpClient;

        public SimpleApiExample()
        {
            _httpClient = new HttpClient();
        }

        public async Task<string> CallApiAsync(string url)
        {
            try
            {
                Console.WriteLine($"Requisição iniciada por: {Environment.CurrentManagedThreadId}");

                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                return await response.Content.ReadAsStringAsync();
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Erro ao fazer a requisição: {ex.Message}");

                return "Erro ao fazer a requisição";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Um erro ocorreu: {ex.Message}");

                return "Erro inesperado";
            }
        }
    }
}
