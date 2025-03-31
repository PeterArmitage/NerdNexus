using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _context.Products
                .Where(p => p.IsAvailable)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            
            return products.Select(MapToDto);
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product != null ? MapToDto(product) : null;
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                StockQuantity = productDto.StockQuantity,
                ImageUrl = productDto.ImageUrl,
                Category = productDto.Category ?? "Other"
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            
            return MapToDto(product);
        }

        public async Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return null;

            if (productDto.Name != null)
                product.Name = productDto.Name;
            if (productDto.Description != null)
                product.Description = productDto.Description;
            if (productDto.Price.HasValue)
                product.Price = productDto.Price.Value;
            if (productDto.StockQuantity.HasValue)
                product.StockQuantity = productDto.StockQuantity.Value;
            if (productDto.ImageUrl != null)
                product.ImageUrl = productDto.ImageUrl;
            if (productDto.Category != null)
                product.Category = productDto.Category;

            product.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToDto(product);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            product.IsAvailable = false;
            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductDto>> GetProductsAsync(ProductFilterDto filterDto)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(filterDto.SearchTerm))
            {
                query = query.Where(p => p.Name.Contains(filterDto.SearchTerm) || 
                                        p.Description.Contains(filterDto.SearchTerm));
            }

            if (!string.IsNullOrEmpty(filterDto.Category))
            {
                query = query.Where(p => p.Category == filterDto.Category);
            }

            if (filterDto.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= filterDto.MinPrice.Value);
            }

            if (filterDto.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= filterDto.MaxPrice.Value);
            }

            var products = await query.ToListAsync();
            return products.Select(MapToDto);
        }

        private static ProductDto MapToDto(Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                ImageUrl = product.ImageUrl,
                Category = product.Category,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt
            };
        }
    }
}
