using Polly.Bulkhead;
using Polly;

namespace Integrador
{
    public class BulkheadExample
    {
        private readonly AsyncBulkheadPolicy _bulkheadPolicy;
        private readonly HttpClient _httpClient;

        public BulkheadExample()
        {
            _httpClient = new HttpClient();

            _bulkheadPolicy = Policy.BulkheadAsync(
                maxParallelization: 5, // Número máximo de execuções simultâneas
                maxQueuingActions: 2,  // Número máximo de ações na fila de espera
                onBulkheadRejectedAsync: async context =>
                {
                    Console.WriteLine("Requisição rejeitada pelo Bulkhead - o serviço está sobrecarregado.");
                });
        }

        public async Task<string> CallApiWithBulkheadAsync(string url)
        {
            try
            {
                return await _bulkheadPolicy.ExecuteAsync(async () =>
                {
                    Console.WriteLine($"Requisição iniciada por: {Environment.CurrentManagedThreadId}");

                    var response = await _httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();

                    return await response.Content.ReadAsStringAsync();
                });
            }
            catch (BulkheadRejectedException ex)
            {
                Console.WriteLine("Requisição rejeitada pelo Bulkhead: " + ex.Message);

                return "Requisição rejeitada devido à sobrecarga";
            }
        }
    }
}