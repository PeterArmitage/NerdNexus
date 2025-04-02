using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Backend.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            try
            {
                var result = await _authService.Register(registerDto);
                var userDto = new UserDto
                {
                    Id = result.Id,
                    Username = result.Username,
                    Email = result.Email,
                    CreatedAt = result.CreatedAt
                };
                return Ok(userDto);
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("username", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { message = "Username already exists" });
            }
            catch (InvalidOperationException ex) when (ex.Message.Contains("email", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { message = "Email already exists" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                var response = await _authService.Login(loginDto);
                return Ok(new { token = response });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid username or password");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try 
            {
                // Log authentication information for debugging
                Console.WriteLine("Auth Request Headers:");
                foreach (var header in Request.Headers)
                {
                    if (header.Key.ToLower() == "authorization")
                    {
                        Console.WriteLine($"{header.Key}: {header.Value.ToString().Substring(0, 15)}...");
                    }
                    else
                    {
                        Console.WriteLine($"{header.Key}: {header.Value}");
                    }
                }

                // Log user claims
                Console.WriteLine("User Claims:");
                foreach (var claim in User.Claims)
                {
                    Console.WriteLine($"Claim: {claim.Type} = {claim.Value}");
                }
                
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int id))
                {
                    Console.WriteLine("Invalid or missing NameIdentifier claim in token");
                    return Unauthorized("Invalid token");
                }

                var profile = await _authService.GetUserProfile(id);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetProfile: {ex.Message}");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UserProfileDto profileDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int id))
            {
                return Unauthorized("Invalid token");
            }

            if (id != profileDto.Id)
            {
                return BadRequest("User ID mismatch");
            }

            try
            {
                var updatedProfile = await _authService.UpdateUserProfile(profileDto);
                return Ok(updatedProfile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }

