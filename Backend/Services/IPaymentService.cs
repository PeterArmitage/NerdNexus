using Backend.DTOs;

namespace Backend.Services
{
    public interface IPaymentService
    {
        Task<PaymentResponseDto> ProcessPaymentAsync(PaymentRequestDto paymentDto);
        Task<PaymentStatusDto> GetPaymentStatusAsync(string paymentId);
        Task<RefundResponseDto> ProcessRefundAsync(RefundRequestDto refundDto);
    }
}
