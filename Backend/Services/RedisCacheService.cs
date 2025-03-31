using StackExchange.Redis;
using System.Text.Json;

public class RedisCacheService : ICacheService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _cache;

    public RedisCacheService(IConnectionMultiplexer redis)
    {
        _redis = redis;
        _cache = redis.GetDatabase();
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var value = await _cache.StringGetAsync(key);
        return value.HasValue ? JsonSerializer.Deserialize<T>(value!) : default;
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expirationTime = null)
    {
        var serializedValue = JsonSerializer.Serialize(value);
        await _cache.StringSetAsync(key, serializedValue, expirationTime);
    }

    public async Task RemoveAsync(string key)
    {
        await _cache.KeyDeleteAsync(key);
    }

    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expirationTime = null)
    {
        var value = await GetAsync<T>(key);
        if (value != null) return value;

        value = await factory();
        await SetAsync(key, value, expirationTime);
        return value;
    }
}