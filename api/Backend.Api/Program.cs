using Backend.Core.Interfaces;
using Backend.Core.Services;
using Backend.Infrastructure.Contexts;
using Backend.Infrastructure.Repositories;
using Backend.Core.Helper;
using Backend.Core.Dtos;
using Backend.Api.Validators;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnimeRepository, AnimeRepository>();
builder.Services.AddScoped<IBookmarkRepository, BookmarkRepository>();
builder.Services.AddScoped<IExternalUserMappingRepository, ExternalUserMappingRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAnimeService, AnimeService>();
builder.Services.AddScoped<IBookmarkService, BookmarkService>();

builder.Services.AddScoped<IValidator<UserReqDto>, UserReqDtoValidator>();

string token;
string connectionString;

if (builder.Environment.IsDevelopment())
{
    var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true) // Optional environment-specific settings file
    .AddEnvironmentVariables()
    .Build();

    connectionString = configuration.GetSection("AppSettings:DatabaseConnection").Value;
    token = configuration.GetSection("AppSettings:Token").Value;
}
else
{
    // Use environment variables for production
    token = Environment.GetEnvironmentVariable("Token");
    connectionString = Environment.GetEnvironmentVariable("DatabaseConnection");
}


builder.Services.AddDbContext<DataContext>(o =>
    o.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("https://anitrackk.vercel.app", "https://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Manage JSON output
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddAuthorization();


builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token))
    };
});

var app = builder.Build();




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Register the Swagger generator and the Swagger UI middlewares
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS should be enabled before authentication/authorization
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();