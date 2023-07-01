using Backend.Contexts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.Processors.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//// Retrieve the configuration from appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<DataContext>(o =>
    o.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

builder.Services.AddScoped<DataContext>();

builder.Services.AddAuthorization();

// register the required Swagger services for NSwag
builder.Services.AddOpenApiDocument(document => 
{
    document.Title = "My Todo Api";
    document.Version = "v1";
    document.AddSecurity("Basic", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.Basic,
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Input your username and password to access the API"
    });

    document.OperationProcessors.Add(
        new AspNetCoreOperationSecurityScopeProcessor("Basic")
    );
});

var app = builder.Build();




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Register the Swagger generator and the Swagger UI middlewares
    app.UseOpenApi();
    app.UseSwaggerUi3();    
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(policy =>
{
    policy.WithOrigins("http://localhost:3000")
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod();
});

app.MapControllers();

app.Run();
