using System.Threading.Tasks;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface IAuthService
    {
        Task<User> Register(RegisterDto registerDto);
        Task<string> Login(LoginDto loginDto);
    }
}
