using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Services;
using Microsoft.OpenApi.Models;
using DotNetEnv;
using StackExchange.Redis;

// Load .env file variables into the environment
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add configuration from environment variables (now including those from .env)
// builder.Configuration.AddEnvironmentVariables(); // This is often added by default by WebApplication.CreateBuilder, but leaving it explicit is fine.

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");


if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string 'DATABASE_URL' not found in environment variables. Ensure .env file is present and loaded.");
}

if (string.IsNullOrEmpty(jwtSecret))
{
    throw new InvalidOperationException("JWT Secret 'JWT_SECRET_KEY' not found in environment variables. Ensure .env file is present and loaded.");
}

// Add DbContext configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)); 

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            
            ValidateLifetime = true, 
            ValidateIssuerSigningKey = true, 
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(jwtSecret) 
            )
        };
    });
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICommunityService, CommunityService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

// Add Memory Cache configuration
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<ICacheService, InMemoryCacheService>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};



app.MapGet("/test-db", async (ApplicationDbContext context) =>
{
    try
    {
        await context.Database.CanConnectAsync();
        return "Database connection successful!";
    }
    catch (Exception ex)
    {
        return $"Database connection failed: {ex.Message}";
    }
});


app.UseMiddleware<CachingMiddleware>();

app.Run();

