namespace Backend.DTOs
{
    public class PaymentRequestDto
    {
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string PaymentMethod { get; set; } = "card";
        public required string PaymentToken { get; set; }
    }

    public class PaymentResponseDto
    {
        public string PaymentId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime ProcessedAt { get; set; }
    }

    public class PaymentStatusDto
    {
        public string PaymentId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime? LastUpdated { get; set; }
    }

    public class RefundRequestDto
    {
        public string PaymentId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Reason { get; set; } = string.Empty;
    }

    public class RefundResponseDto
    {
        public string RefundId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime ProcessedAt { get; set; }
    }
}
