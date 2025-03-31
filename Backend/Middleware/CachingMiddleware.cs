using Microsoft.AspNetCore.Http;
using System.Text;

public class CachingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ICacheService _cacheService;
    private readonly ILogger<CachingMiddleware> _logger;

    public CachingMiddleware(
        RequestDelegate next,
        ICacheService cacheService,
        ILogger<CachingMiddleware> logger)
    {
        _next = next;
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!IsCacheable(context.Request))
        {
            await _next(context);
            return;
        }

        string cacheKey = GenerateCacheKey(context.Request);
        var cachedResponse = await _cacheService.GetAsync<string>(cacheKey);

        if (cachedResponse != null)
        {
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(cachedResponse);
            return;
        }

        var originalBodyStream = context.Response.Body;
        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;

        await _next(context);

        memoryStream.Position = 0;
        var responseBody = await new StreamReader(memoryStream).ReadToEndAsync();

        memoryStream.Position = 0;
        await memoryStream.CopyToAsync(originalBodyStream);

        if (context.Response.StatusCode == 200)
        {
            await _cacheService.SetAsync(cacheKey, responseBody, TimeSpan.FromMinutes(10));
        }
    }

    private bool IsCacheable(HttpRequest request)
    {
        return request.Method == HttpMethod.Get.Method &&
               !request.Path.StartsWithSegments("/api/auth");
    }

    private string GenerateCacheKey(HttpRequest request)
    {
        var builder = new StringBuilder();
        builder.Append($"{request.Path}");
        
        foreach (var (key, value) in request.Query.OrderBy(x => x.Key))
        {
            builder.Append($"|{key}={value}");
        }

        return builder.ToString();
    }
}
