using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class CommunityService : ICommunityService
    {
        private readonly ApplicationDbContext _context;

        public CommunityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Review>> GetProductReviewsAsync(int productId)
        {
            return await _context.Reviews
                .Where(r => r.ProductId == productId)
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<Review> CreateReviewAsync(int userId, ReviewDto reviewDto)
        {
            var review = new Review
            {
                Title = reviewDto.Title,
                Content = reviewDto.Content,
                Rating = reviewDto.Rating,
                ProductId = reviewDto.ProductId,
                UserId = userId
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<bool> DeleteReviewAsync(int reviewId, int userId)
        {
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r => r.Id == reviewId && r.UserId == userId);
            
            if (review == null) return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ForumPost>> GetForumPostsAsync(string? category = null)
        {
            var query = _context.ForumPosts
                .Include(p => p.User)
                .Where(p => p.IsActive);

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.Category == category);
            }

            return await query
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<ForumPost> CreateForumPostAsync(int userId, ForumPostDto forumPostDto)
        {
            var post = new ForumPost
            {
                Title = forumPostDto.Title,
                Content = forumPostDto.Content,
                Category = forumPostDto.Category,
                UserId = userId
            };

            _context.ForumPosts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<ForumPost?> UpdateForumPostAsync(int postId, int userId, ForumPostDto forumPostDto)
        {
            var post = await _context.ForumPosts
                .FirstOrDefaultAsync(p => p.Id == postId && p.UserId == userId);

            if (post == null) return null;

            post.Title = forumPostDto.Title;
            post.Content = forumPostDto.Content;
            post.Category = forumPostDto.Category;
            post.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<bool> DeleteForumPostAsync(int postId, int userId)
        {
            var post = await _context.ForumPosts
                .FirstOrDefaultAsync(p => p.Id == postId && p.UserId == userId);

            if (post == null) return false;

            post.IsActive = false;
            post.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Review?> UpdateReviewAsync(int reviewId, int userId, ReviewDto reviewDto)
        {
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r => r.Id == reviewId && r.UserId == userId);
            
            if (review == null) return null;
            
            review.Title = reviewDto.Title;
            review.Content = reviewDto.Content;
            review.Rating = reviewDto.Rating;
            review.UpdatedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<IEnumerable<Review>> GetUserReviewsAsync(int userId)
        {
            return await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Product)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
    }
}
