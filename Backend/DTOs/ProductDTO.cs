namespace Backend.DTOs
{
    public class ProductDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public string Category { get; set; } = "Other";
    }
}
