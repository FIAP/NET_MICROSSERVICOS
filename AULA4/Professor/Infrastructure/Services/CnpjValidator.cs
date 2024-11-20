using API.Models;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace Infrastructure.Services;

public class CnpjValidator(IConfiguration configuration)
{
    private readonly string _cnpjApiBaseUrl = configuration.GetSection("CnpjApi:BaseUrl").Value;

    public async Task<bool> ValidateCNPJAsync(string cnpj)
    {
        var url = $"{_cnpjApiBaseUrl}{cnpj}";

        using var httpClient = new HttpClient();

        try
        {
            var response = await httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();

                var cnpjData = JsonSerializer.Deserialize<CnpjResponse>(jsonResponse);

                return cnpjData.Status == "OK";
            }
            else
            {
                Console.WriteLine($"Failed to get data: {response.StatusCode}");
                return false;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }
    }
}
