namespace Backend.DTOs
{
    public class ForumPostDto
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string Category { get; set; } = "General";
    }
}
