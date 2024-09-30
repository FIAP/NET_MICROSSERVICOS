# Use a imagem base oficial do .NET 8 para o build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie os arquivos da solução para o container
COPY *.sln .
COPY API/*.csproj ./API/
COPY db/*.csproj ./db/

# Restaure as dependências
RUN dotnet restore

# Copie o restante dos arquivos para o container
COPY . .

# Publique a aplicação
RUN dotnet publish API/*.csproj -c Release -o out

# Use a imagem base do runtime do .NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copie os arquivos publicados para o container
COPY --from=build /app/out ./

# Exponha a porta que a aplicação irá utilizar
EXPOSE 80


# Install the agent
RUN apt-get update && apt-get install -y wget ca-certificates gnupg \
&& echo 'deb http://apt.newrelic.com/debian/ newrelic non-free' | tee /etc/apt/sources.list.d/newrelic.list \
&& wget https://download.newrelic.com/548C16BF.gpg \
&& apt-key add 548C16BF.gpg \
&& apt-get update \
&& apt-get install -y 'newrelic-dotnet-agent' \
&& rm -rf /var/lib/apt/lists/*

# Enable the agent
ENV CORECLR_ENABLE_PROFILING=1 \
CORECLR_PROFILER={36032161-FFC0-4B61-B559-F6C5D41BAE5A} \
CORECLR_NEWRELIC_HOME=/usr/local/newrelic-dotnet-agent \
CORECLR_PROFILER_PATH=/usr/local/newrelic-dotnet-agent/libNewRelicProfiler.so \
NEW_RELIC_LICENSE_KEY=3328b67889b26e04b725fc5aba95ec0cFFFFNRAL \
NEW_RELIC_APP_NAME="mac-adm"


# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "API.dll"]
