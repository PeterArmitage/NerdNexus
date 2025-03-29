using Backend.Models;
using Backend.DTOs;

namespace Backend.Services
{
    public interface ICommunityService
    {
        // Review methods
        Task<IEnumerable<Review>> GetProductReviewsAsync(int productId);
        Task<Review> CreateReviewAsync(int userId, ReviewDto reviewDto);
        Task<bool> DeleteReviewAsync(int reviewId, int userId);

        // Forum methods
        Task<IEnumerable<ForumPost>> GetForumPostsAsync(string? category = null);
        Task<ForumPost> CreateForumPostAsync(int userId, ForumPostDto forumPostDto);
        Task<ForumPost?> UpdateForumPostAsync(int postId, int userId, ForumPostDto forumPostDto);
        Task<bool> DeleteForumPostAsync(int postId, int userId);
    }
}