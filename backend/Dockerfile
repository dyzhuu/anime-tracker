FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src

COPY Backend.sln .
COPY Backend.Api/*.csproj ./Backend.Api/
COPY Backend.Core/*.csproj ./Backend.Core/
COPY Backend.Infrastructure/*.csproj ./Backend.Infrastructure/
COPY Backend.Domain/*.csproj ./Backend.Domain/
COPY Backend.Tests/*.csproj ./Backend.Tests/

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Backend.Api.dll"]`