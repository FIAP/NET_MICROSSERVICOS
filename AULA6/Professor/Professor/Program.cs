using Applicantion.Interfaces;
using Domain.Entities;
using HealthChecks.UI.Client;
using Infrastructure.Consumers;
using Infrastructure.Midleware;
using Infrastructure.Repositories;
using MassTransit;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




#region [Config]
string postgresConnectionString = builder.Configuration.GetSection("Databases:ConnectionString").Value;

builder.Services.AddHealthChecks()
    .AddNpgSql(
        postgresConnectionString,
        name: "PostgreSQL",
        failureStatus: HealthStatus.Unhealthy,
        tags: new[] { "db", "sql", "postgres" });

builder.Services.AddDbContext<AppDbContext>(
        options => options.UseNpgsql(builder.Configuration.GetSection("Databases:ConnectionString").Value));

builder.Services.AddTransient<AppDbContext>();
#endregion

#region [Broker]
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<ProfessorConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMQ:HostName"], h =>
        {
            h.Username(builder.Configuration["RabbitMQ:Username"]);
            h.Password(builder.Configuration["RabbitMQ:Password"]);
        });

        cfg.ReceiveEndpoint("professor-created-queue", e =>
        {
            e.ConfigureConsumer<ProfessorConsumer>(context);
        });
    });
});
#endregion

#region [DI]
builder.Services.AddTransient<ICorrelationIdGenerator, CorrelationIdGenerator>();

builder.Services.AddTransient(typeof(BaseLogger<>));
builder.Services.AddScoped<IRepository<Professor>, ProfessorRepository>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region [Healthcheck]
app.UseHealthChecks("/health", new HealthCheckOptions
{
    Predicate = _ => true,
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse,

});

#endregion

app.UseAuthorization();

app.MapControllers();

app.UseCorrelationMiddleware();


app.Run();
