using Backend.Models;
using Backend.DTOs;

namespace Backend.Services
{
    public interface IOrderService
    {
        Task<OrderResponseDto> CreateOrderAsync(int userId, OrderDto orderDto);
        Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, int userId);
        Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(int userId);
        Task<OrderResponseDto?> UpdateOrderStatusAsync(int orderId, string status);
        Task<bool> CancelOrderAsync(int orderId, int userId);
    }
}
