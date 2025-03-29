namespace Backend.DTOs
{
    public class ReviewDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public int Rating { get; set; }
        public int ProductId { get; set; }
    }
}
