
namespace Infrastructure.Midleware;
public interface ICorrelationIdGenerator
{
    string Get();
    void Set(string correlationId);
}
