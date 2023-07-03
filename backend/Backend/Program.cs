using Backend.Contexts;
using Backend.Repositories;
using Backend.Services;
using Backend.Helper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.Processors.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnimeRepository, AnimeRepository>();
builder.Services.AddScoped<IBookmarkRepository, BookmarkRepository>();



builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAnimeService, AnimeService>();
builder.Services.AddScoped<IBookmarkService, BookmarkService>();



//// Retrieve the configuration from appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

// establish connection to database
var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<DataContext>(o =>
    o.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// Manage JSON output
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

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

app.UseAuthorization();

//app.UseCors(policy =>
//{
//    policy.WithOrigins("http://localhost:3000")
//        .AllowCredentials()
//        .AllowAnyHeader()
//        .AllowAnyMethod();
//});

app.MapControllers();

app.Run();
