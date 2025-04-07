using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Data.Repositories;
using Backend.Services;
using Backend.Middleware;
using Microsoft.OpenApi.Models;
using DotNetEnv;
using StackExchange.Redis;
using FluentValidation;
using FluentValidation.AspNetCore;
using Backend.Validators;
using Backend.DTOs;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// Load .env file variables into the environment
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add configuration from environment variables (now including those from .env)
// builder.Configuration.AddEnvironmentVariables(); // This is often added by default by WebApplication.CreateBuilder, but leaving it explicit is fine.

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
// Use the new FluentValidation approach
builder.Services.AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters()
    .AddValidatorsFromAssemblyContaining<RegisterDtoValidator>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register validators
builder.Services.AddScoped<IValidator<RegisterDto>, RegisterDtoValidator>();
builder.Services.AddScoped<IValidator<LoginDto>, LoginDtoValidator>();
builder.Services.AddScoped<IValidator<UserProfileDto>, UserProfileDtoValidator>();

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
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(jwtSecret)
            ),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        // Print JWT secret length for debugging
        Console.WriteLine($"JWT Configuration - Secret key length: {jwtSecret.Length} characters");

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine($"OnAuthenticationFailed: {context.Exception.GetType().Name} - {context.Exception.Message}");
                
                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Append("Token-Expired", "true");
                    Console.WriteLine("Token expired");
                }
                else if (context.Exception is SecurityTokenInvalidSignatureException)
                {
                    Console.WriteLine("Invalid token signature - This often indicates a signing algorithm mismatch");
                }
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("Token validated successfully");
                
                // Log claims for debugging
                var claimsIdentity = context.Principal?.Identity as ClaimsIdentity;
                if (claimsIdentity != null)
                {
                    Console.WriteLine("Claims in validated token:");
                    foreach (var claim in claimsIdentity.Claims)
                    {
                        Console.WriteLine($"  {claim.Type}: {claim.Value}");
                    }
                }
                
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                Console.WriteLine($"OnChallenge: {context.Error}, {context.ErrorDescription}");
                return Task.CompletedTask;
            },
            OnMessageReceived = context =>
            {
                var token = context.Token;
                if (token != null)
                {
                    Console.WriteLine($"Received token length: {token.Length} characters");
                }
                else
                {
                    Console.WriteLine("No token received in request");
                }
                return Task.CompletedTask;
            }
        };
    });
    
// Register repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Register services
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

// Enable CORS
app.UseCors();

// Add custom middleware
app.UseValidationMiddleware();

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

