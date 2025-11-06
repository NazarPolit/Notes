
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Notes.Backend.sln .
COPY Notes.Application/Notes.Application.csproj Notes.Application/
COPY Notes.Domain/Notes.Domain.csproj Notes.Domain/
COPY Notes.Persistance/Notes.Persistance.csproj Notes.Persistance/
COPY Notes.WebApi/Notes.WebApi.csproj Notes.WebApi/
COPY Notes.Tests/Notes.Tests.csproj Notes.Tests/

RUN dotnet restore "Notes.Backend.sln"

COPY . .

WORKDIR "/src/Notes.WebApi"
RUN dotnet publish "Notes.WebApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

RUN mkdir data

ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Notes.WebApi.dll"]