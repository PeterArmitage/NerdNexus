using Microsoft.Extensions.Caching.Memory;

namespace Backend.Services
{
    public class InMemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _cache;

        public InMemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public Task<T?> GetAsync<T>(string key)
        {
            // Since IMemoryCache operations are synchronous, wrap the result in Task
            return Task.FromResult(_cache.Get<T>(key));
        }

        public Task SetAsync<T>(string key, T value, TimeSpan? expirationTime = null)
        {
            var options = new MemoryCacheEntryOptions();
            if (expirationTime.HasValue)
            {
                options.AbsoluteExpirationRelativeToNow = expirationTime;
            }
            _cache.Set(key, value, options);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(string key)
        {
            _cache.Remove(key);
            return Task.CompletedTask;
        }

        public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expirationTime = null)
        {
            if (_cache.TryGetValue<T>(key, out var cachedValue))
            {
                return cachedValue!; // We know it's not null because TryGetValue succeeded
            }

            var value = await factory();
            if (value is not null) // Null check before caching
            {
                await SetAsync(key, value, expirationTime);
                return value;
            }
            
            throw new InvalidOperationException($"Factory method returned null for key: {key}");
        }
    }
}