using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Services;
using Backend.DTOs;
using System.Security.Claims;

namespace Backend.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class CommunityController : ControllerBase
    {
        private readonly ICommunityService _communityService;

        public CommunityController(ICommunityService communityService)
        {
            _communityService = communityService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim?.Value ?? throw new UnauthorizedAccessException());
        }

        [HttpGet("products/{productId}/reviews")]
        public async Task<IActionResult> GetProductReviews(int productId)
        {
            var reviews = await _communityService.GetProductReviewsAsync(productId);
            return Ok(reviews);
        }

        [Authorize]
        [HttpPost("reviews")]
        public async Task<IActionResult> CreateReview(ReviewDto reviewDto)
        {
            var userId = GetUserId();
            var review = await _communityService.CreateReviewAsync(userId, reviewDto);
            return CreatedAtAction(nameof(GetProductReviews), new { productId = review.ProductId }, review);
        }

        [Authorize]
        [HttpDelete("reviews/{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            var userId = GetUserId();
            var result = await _communityService.DeleteReviewAsync(reviewId, userId);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpGet("forum")]
        public async Task<IActionResult> GetForumPosts([FromQuery] string? category)
        {
            var posts = await _communityService.GetForumPostsAsync(category);
            return Ok(posts);
        }

        [Authorize]
        [HttpPost("forum")]
        public async Task<IActionResult> CreateForumPost(ForumPostDto forumPostDto)
        {
            var userId = GetUserId();
            var post = await _communityService.CreateForumPostAsync(userId, forumPostDto);
            return CreatedAtAction(nameof(GetForumPosts), new { }, post);
        }

        [Authorize]
        [HttpPut("forum/{postId}")]
        public async Task<IActionResult> UpdateForumPost(int postId, ForumPostDto forumPostDto)
        {
            var userId = GetUserId();
            var post = await _communityService.UpdateForumPostAsync(postId, userId, forumPostDto);
            if (post == null) return NotFound();
            return Ok(post);
        }

        [Authorize]
        [HttpDelete("forum/{postId}")]
        public async Task<IActionResult> DeleteForumPost(int postId)
        {
            var userId = GetUserId();
            var result = await _communityService.DeleteForumPostAsync(postId, userId);
            if (!result) return NotFound();
            return NoContent();
        }
    }

